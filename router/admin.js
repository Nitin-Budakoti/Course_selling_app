const {Router} = require("express");
let adminRouter = Router();
const {adminModel}  = require("../db");
const admin_validation = require("../input_validation/admin_validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_ADMIN = "sdfasdfasdf"
adminRouter.post("/signup", async function(req, res) {
    const validationResult = admin_validation.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            msg: "error in zod validation",
            errors: validationResult.error.errors,
        });
    }

    const { email, password, firstName, lastName } = validationResult.data;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });
        res.status(201).json({
            msg: "User created successfully",
        });
    } catch (err) {
        res.status(500).json({
            msg: "Server error",
            error: err.message,
        });
    }
});






adminRouter.post("/signin",async function(req, res) {
    const { email, password } = req.body;

    try {
        const admin = await adminModel.findOne({
            email: email});
        if (!admin) {
            return res.status(401).json({
                msg: "Invalid credentials",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                msg: "Invalid credentials",
            });
        }

        const token = jwt.sign({ id: admin._id }, JWT_SECRET_ADMIN);
        res.status(200).json({
            msg: "User signed in successfully",
            token: token,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Server error",
            error: err.message,
        });
    }
});

adminRouter.post("/course", function(req, res) {
    res.json({
        msg: "signin endpoint"
    });
});

adminRouter.put("/course", function(req, res) {
    res.json({
        msg: "signin endpoint"
    });
});

adminRouter.get("/course/bulk", function(req, res) {
    res.json({
        msg: "Admin course will displayed here"
    });
});
module.exports = adminRouter;
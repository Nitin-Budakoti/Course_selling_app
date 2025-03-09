const { Router } = require("express");
const user_validation = require("../input_validation/user_validation");
const bcrypt = require("bcrypt");
let userRouter = Router();
const {userModel} = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "dfsadfkjasdfh222232";

// user sign up route handler
userRouter.post("/signup", async function(req, res) {
    const validationResult = user_validation.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            msg: "error in zod validation",
            errors: validationResult.error.errors,
        });
    }

    const { email, password, firstName, lastName } = validationResult.data;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({
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

// user sign in route handler
userRouter.post("/signin", async function(req, res) {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({
            email: email});
        if (!user) {
            return res.status(401).json({
                msg: "Invalid credentials",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                msg: "Invalid credentials",
            });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET);
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

userRouter.get("/purchases", function(req, res) {
    res.json({
        msg: "purchases endpoint",
    });
});

module.exports = userRouter;
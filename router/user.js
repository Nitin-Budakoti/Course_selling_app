const { Router } = require("express");
const user_validation = require("../input_validation/user_validation");
const bcrypt = require("bcrypt");
let userRouter = Router();
const {userModel, courseModel, purchaseModel} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET_USER} = require("../config");
const usermiddleware = require("../middleware/user");  

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
            console.log(user);
        if (!user) {
            return res.status(401).json({
                msg: "Invalid credentials",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            return res.status(401).json({
                msg: "Invalid credentials",
            });
        }

        const token = jwt.sign({ id:user._id },JWT_SECRET_USER);
        console.log(token);
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

userRouter.get("/purchases",usermiddleware ,async function(req, res) {
    const userId = req.userId;
    const purchases = await purchaseModel.find({
        userId
    });
    const coursedata = await courseModel.find({
        _id:{$in:purchases.map(x=>x.courseId)}
    });
    console.log(coursedata);

    res.json({
        purchases,
        coursedata
    }); 

});

module.exports = userRouter;
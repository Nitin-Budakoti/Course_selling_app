const {Router} = require("express");
let adminRouter = Router();
const {adminModel, courseModel}  = require("../db");
const admin_validation = require("../input_validation/admin_validation");
const bcrypt = require("bcrypt");
const adminmiddleware= require("../middleware/admin")
const admin_course_validation = require("../input_validation/admin_course_validation");
const jwt = require("jsonwebtoken");
const {JWT_SECRET_ADMIN} = require("../config");

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

adminRouter.post("/course",adminmiddleware, async function(req, res) {
  
    const adminId = req.adminId;
    console.log(adminId);
    const validate_course_data = admin_course_validation.safeParse(req.body);
    if (!validate_course_data.success) {
        return res.status(400).json({
            msg: "error in zod validation",
            errors: validate_course_data.error.errors,
        });
    }else{
            const { title, description, price, imageUrl} = validate_course_data.data;
             await courseModel.create({
                title : title,
                description: description,
                price: price,
                imageUrl:  imageUrl,
                createrId: adminId,
            });
            console.log(validate_course_data._id);
            res.send({
                msg: "Course created successfully--",
                courseId : validate_course_data._id
            })
    }
});

adminRouter.put("/course",adminmiddleware,async function(req, res) {
    const adminId = req.adminId;
    console.log(adminId);
    const {title, description, price, imageUrl, courseId} =  req.body;
    const course = await courseModel.updateOne({
        //fileteration work 
        _id: courseId, 
        createrId: adminId,// this checks weather that partuclar course is created by that admin or not
    },{
        title: title,
        description:description,
        price:price,
        imageUrl:imageUrl,

    });
    if(!course){
        return res.status(400).json({
            msg: "Course not found",
        });
    }else{
    res.json({
        msg: "Course updated successfully== ",
    
    });
}

   
});

adminRouter.get("/course/bulk",adminmiddleware,async function(req, res) {
    const adminId = req.adminId;
   
    const course = await courseModel.findOne({
        createrId: adminId,// this checks weather that partuclar course is created by that admin or not
    });
    res.json({
        msg: "Course updated successfully",
        course
    });
});
module.exports = adminRouter;
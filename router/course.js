const { Router } = require("express");
let courseRouter = Router();
const usermiddlemare = require("../middleware/user");
const {purchaseModel, courseModel} = require("../db");
courseRouter.post("/purchase",usermiddlemare, async function(req, res) {
    //todo check the user paid the amout or not
    console.log("middleware surpases");
    const userId = req.userId;
    const courseId = req.body.courseId;
    await purchaseModel.create({
        userId: userId,
        courseId: courseId
    });
    res.json({
        msg: "purchase successfull"
    });
});

courseRouter.get("/preview",async function(req, res) {
    const course = await courseModel.find({});
    res.json({
        course
    });
});

module.exports = courseRouter;
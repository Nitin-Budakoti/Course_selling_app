const express = require("express");
const app = express();
const mogoose = require("mongoose");
const userRouter = require("./router/user");
const courseRouter = require("./router/course");
const adminRouter = require("./router/admin");
const mongoose = require("mongoose");

//using Router method to handle endpoints
app.use("/api/v1/user", userRouter);    //using Router method to handle endpoints
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course", courseRouter);

async function main(){
await mongoose.connect("mongodb+srv://Nitin_budakoti:ysR4ALHkX6tDEdif@cluster0.ooku2.mongodb.net/course-era");
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
}
main();
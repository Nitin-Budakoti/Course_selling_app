const express = require("express");
const app = express();
const userRouter = require("./router/user");
const courseRouter = require("./router/course");
const adminRouter = require("./router/admin");
const{ adminModel } = require("./db");


//using Router method to handle endpoints
app.use("/api/v1/user", userRouter);    //using Router method to handle endpoints
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course", courseRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
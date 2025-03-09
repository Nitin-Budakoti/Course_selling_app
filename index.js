const express = require("express");
const app = express();
const userRouter = require("./router/user");
const courseRouter = require("./router/course");

//using Router method to handle endpoints
app.use("/api/v1/user", userRouter);  // all the request come to user endpoint will be handled by userRouter
app.use("/api/v1/course", courseRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
express = require("express");
app = express();
const userRouter = require("./router/user");
const courseRouter = require("./router/course");
//using Router method to handle endpoints
app.use("/user",userRouter);  // all the request come to user endpoint will be handled by userRouter
app.use("/course",courseRouter);

app.listen(3000);
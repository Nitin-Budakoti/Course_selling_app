const express = require("express");
const app = express();
const userRouter = require("./router/user");
const courseRouter = require("./router/course");
const adminRouter = require("./router/admin");
const mongoose = require("mongoose");
// using dotenv file to hide credentials login and passward 
require("dotenv").config();
//using Router method to handle endpoints
app.use("/api/v1/user", userRouter);    //using Router method to handle endpoints
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course", courseRouter);

async function main(){
let url = process.env.URI;
await mongoose.connect(url);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
}
main();
const express = require("express");
const app = express();
const userRouter = require("./router/user");
const courseRouter = require("./router/course");
const adminRouter = require("./router/admin");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json()); // using json method to handle json data

// using Router method to handle endpoints
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
    try {
        await mongoose.connect(process.env.URI);
        console.log("Connected to MongoDB");

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}

main();
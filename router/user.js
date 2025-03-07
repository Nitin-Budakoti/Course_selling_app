const { Router } = require("express");

let userRouter = Router();

userRouter.post("/signup", function(req, res) {
    res.json({
        msg: "signup endpoint"
    });
});

userRouter.post("/signin", function(req, res) {
    res.json({
        msg: "signin endpoint"
    });
});

userRouter.get("/purchases", function(req, res) {
    res.json({
        msg: "purchases endpoint"
    });
});

module.exports = userRouter;
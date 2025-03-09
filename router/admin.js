const {Router} = require("express");
let adminRouter = Router();

adminRouter.post("/signup", function(req, res) {
    res.json({
        msg: "signup endpoint"
    });
});

adminRouter.post("/signin", function(req, res) {
    res.json({
        msg: "signin endpoint"
    });
});

adminRouter.post("/course", function(req, res) {
    res.json({
        msg: "signin endpoint"
    });
});

adminRouter.put("/course", function(req, res) {
    res.json({
        msg: "signin endpoint"
    });
});

adminRouter.get("/course/bulk", function(req, res) {
    res.json({
        msg: "Admin course will displayed here"
    });
});
module.exports = adminRouter;
const { Router } = require("express");
let courseRouter = Router();

courseRouter.post("/purchases", function(req, res) {
    res.json({
        msg: "purcshases endpoint"
    });
});

courseRouter.get("/preview", function(req, res) {
    res.json({
        msg: "preview endpoint"
    });
});

module.exports = courseRouter;
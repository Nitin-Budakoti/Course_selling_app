const {Router} = require("express");

let userRouter = Router();

userRouter.post("/signup",function(req,res){
    res.json(
        {
            msg:"signup endpoints"
        }
    );

});
userRouter.post("/signin",function(req,res){
        res.json(
            {
                msg:"signin endpoints"
            }
        );

});


userRouter.get("/purchases",function(req,res){
    res.json(
        {
            msg:"signin endpoints"
        }
    );

});

module.exports = userRouter;

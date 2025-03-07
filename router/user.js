const {Router} = require("express");

let userRouter = Router();

userRouter.post("/signup",(req,res)=>{
    res.json(
        {
            msg:"signup endpoints"
        }
    );

});
userRouter.post("/signin",(req,res)=>{
        res.json(
            {
                msg:"signin endpoints"
            }
        );

});


userRouter.get("/purchases",(req,res)=>{
    res.json(
        {
            msg:"signin endpoints"
        }
    );

});

module.exports({
    userRouter:userRouter
})

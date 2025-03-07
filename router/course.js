const {Router} = require("express");
const { use } = require("./user");
let courseRouter = Router();


courseRouter.post("/purchases",function(req,res){
    res.json(
        {
            msg:"signin endpoints"
        }
    );

});

courseRouter.get("/preview",function(req,res){
    res.json(
        {
            msg:"signin endpoints"
        }
    );
});
module.exports = courseRouter;
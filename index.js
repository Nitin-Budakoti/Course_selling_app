express = require("express");
app = express();

app.post("/user/signup",(req,res)=>{
    res.json(
        {
            msg:"signup endpoints"
        }
    );

});
    app.post("/user/signin",(req,res)=>{
        res.json(
            {
                msg:"signin endpoints"
            }
        );

});


app.get("/user/purchases",(req,res)=>{
    res.json(
        {
            msg:"signin endpoints"
        }
    );

});

app.post("/course/purchases",(req,res)=>{
    res.json(
        {
            msg:"signin endpoints"
        }
    );

});

app.get("./courses",(req,res)=>{
    res.json(
        {
            msg:"signin endpoints"
        }
    );
});

app.listen(3000);
const jwt = require('jsonwebtoken');
const {JWT_SECRET_USER} = require("../config");
function usermiddleware(req,res,next){
    console.log("inside middle ware");
const token = req.headers.token;
console.log(token + " this is token");
const decoded = jwt.verify(token,JWT_SECRET_USER);
console.log(decoded + " this is decoded");
if(decoded){ 
    req.userId = decoded.id;
    next();
}
else{
    res.status(401).json({message: "Unauthorized"});    
}

}

module.exports = usermiddleware;
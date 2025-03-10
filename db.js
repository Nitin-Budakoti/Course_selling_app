const {Schema , default: mongoose} = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
console.log("connected to database");
let userSchema = new Schema({
    email : {type : String, unique: true, required: true},
    password : {type : String, required : true},
    firstName : String,
    lastName : String,

});


let adminSchema = new Schema({
    email : {type : String, unique: true, required: true},
    password : {type : String, required : true},
    firstName : String,
    lastName : String,
});


let courseShema = new Schema({
    title :  String,
    description : String,
    price : Number,
    imageUrl: String,
    createrId : ObjectId
});


let purchaseShema = new Schema({
    userId : ObjectId,
    courseId : ObjectId,
    
});
const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseShema);
const purchaseModel = mongoose.model("purchase", purchaseShema);

module.exports=
{
    userModel,adminModel,courseModel,purchaseModel
};



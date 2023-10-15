const mongoose=require('mongoose');
const createuser=mongoose.Schema({
    "username":{type:String, unique:true},
    "email":{type:String, unique:true},
    "password":String,
    "gender":{type:String},
    "image":String

})
const createmodel=mongoose.model('user',createuser);
module.exports=createmodel;
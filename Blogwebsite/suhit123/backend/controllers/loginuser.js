const jwt=require('jsonwebtoken');
const userschema=require('../models/usermodel');
const bcrypt=require('bcrypt');
exports.loginuser=async(req,res)=>{
    let user;
    try{
    if(req.body.username!=='' &&req.body.password!==''  ){
        user= await userschema.findOne({username:req.body.username})
        const match=await bcrypt.compare(req.body.password,user.password);
        if(!user){
            return res.status(401).send("username not registered!");
        }
        else if(user && !(match)){
            return res.status(401).send("Incorrect password!");
        }
        }
        else{
            return res.status(401).send("Enter both the fields");
        }
    }
    catch(err){
        console.log(err);
    }
    let token;
    try{
       token=jwt.sign({username:user.username,email:user.email},"shhhsecret",{expiresIn:"1h"});
    }
    catch(err){
        return res.status(401).send("something went wrong!");
    };
    res.status(200).json({token:token});
}
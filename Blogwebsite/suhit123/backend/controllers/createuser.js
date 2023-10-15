const express=require('express');
const createschema=require('../models/usermodel');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
require('dotenv').config();
exports.createuser=async(req,res)=>{
    const check1=await createschema.findOne({username:req.body.username});
    const check2=await createschema.findOne({email:req.body.email});
    if(check1===null && check2===null){
    const hashpassword =await bcrypt.hash(req.body.password,10);
    const user={
        username:req.body.username,
        email:req.body.email,
        gender:req.body.gender,
        password:hashpassword
    }
    await createschema.create(user).then(()=>{
        console.log("successfully added")
    })
    .catch((err)=>{
        console.log(err);
    })
    let token;
    try{
        token=jwt.sign(user,process.env.SECRET_KEY,{expiresIn:"1h"});
    }
    catch(err){
        let error= new Error("Something went wrong!");
        return res.send(error);
    }
    res.status(201).json({token:token});
    }
    else{
        if(check1!==null && check2!=null){
            return res.status(400).send("Username and Email already exist!");
        }
        else if(check1){
            return res.status(400).send("Username already exist!");
        }
        else if(check2){
            res.status(400).send("Email already exist!");
        }
    }
} 
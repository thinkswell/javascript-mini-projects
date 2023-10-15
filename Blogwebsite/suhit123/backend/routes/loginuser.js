const express=require('express')
const router=express.Router();
const loginuser=require('../controllers/loginuser');
router.post('/login',loginuser.loginuser);
exports.route=router;
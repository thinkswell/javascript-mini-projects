const createusercontrol=require('../controllers/createuser');
const express=require('express');
const router=express.Router();
router.post('/createaccount',createusercontrol.createuser);
exports.route=router;
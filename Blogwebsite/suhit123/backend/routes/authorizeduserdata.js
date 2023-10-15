const express=require('express');
const router=express.Router();
const controllers=require('../controllers/authorizeuserdata');
router.post('/userdetails',controllers.authorize);
exports.route=router;
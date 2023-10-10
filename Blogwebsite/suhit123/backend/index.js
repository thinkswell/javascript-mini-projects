const express= require('express');
const app=express();
const cors=require('cors');
const port =process.env.PORT ||8080;
require('dotenv').config();
const connectwithdb =require('./db');
const connection=connectwithdb.connectwithdb;
connection();
const blogroute=require('./routes/blogs');
const createroute=require('./routes/createuser');
const loginuser=require('./routes/loginuser');
const authorizeduserdata=require('./routes/authorizeduserdata');
app.use(express.json());
app.use(cors());
app.use('/',blogroute.route);
app.use('/',createroute.route);
app.use('/',loginuser.route);
app.use('/',authorizeduserdata.route);
app.listen(port,()=>{
    console.log(`listening to port number ${port}`);
})
const mongoose=require('mongoose');
require('dotenv').config();
const connectwithdb=()=>{
console.log(process.env.DB_URL)
mongoose.connect(`${process.env.DB_URL}`)
.then(()=>{
    console.log("connect with db");
})
.catch((err)=>{
    console.log(err);
})
}
exports.connectwithdb=connectwithdb;
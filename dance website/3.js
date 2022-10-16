//synchronous or blocking (line-by-line execution)
//asynchronous or non-blocking (line-by-line execution not guaranteed) callbacks will fired

const fs = require("fs");
fs.readFile("dele.txt","utf-8",(err,data)=>{
    console.log(err,data);
    // 1st argument is error, 2nd is data
});
console.log("this is a message")
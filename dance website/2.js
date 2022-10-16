const fs = require("fs");
const text = fs.readFileSync("dele.txt","utf-8");
console.log("the content of the file is ");
console.log(text);

console.log("creating a new file")
fs.writeFileSync("rohan.txt",text);
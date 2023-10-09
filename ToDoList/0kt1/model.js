var mongoose = require("mongoose");


//Our task model
var todoSchema = new mongoose.Schema(
    {
        task: String,
        date: String,
    }
)



module.exports = new mongoose.model("Todo", todoSchema);

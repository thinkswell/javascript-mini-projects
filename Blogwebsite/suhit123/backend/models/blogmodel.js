const mongoose= require('mongoose');
const blogdata=mongoose.Schema({
        "heading":String,
        "image":String,
        "author":String,
        "catogary":String,
        "comments":[{
            "date":{type:Date,default:Date.now},
            "user":String,
            "comment":String
        }],
        "shortdescription":String,
        "date":{ type: Date, default: Date.now },
        "content":String
    })
const blogspace=mongoose.model('blog',blogdata);
module.exports=blogspace;

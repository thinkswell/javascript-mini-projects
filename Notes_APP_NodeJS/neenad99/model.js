const mongoose = require('mongoose');


const NotesSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
},{
    toJSON:{
        transform(doc,ret){
            delete ret.__v;
        }
    }
});

const Notes = mongoose.model("Note",NotesSchema);

module.exports = Notes;
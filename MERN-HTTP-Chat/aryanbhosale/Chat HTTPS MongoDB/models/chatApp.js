const mongoose = require('mongoose');

// Schema 
const Schema = mongoose.Schema;
const ChatAppSchema = new Schema({
    name : String,
    body : String,
    date : {
        type : String,
        default : Date.now()
    }
});

// Models
const ChatApp = mongoose.model('ChatApp', ChatAppSchema);

module.exports = ChatApp;
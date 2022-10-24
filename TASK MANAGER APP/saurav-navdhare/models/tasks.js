const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must provide activity Name"], //Custom message to show if no name is there
        trim: true, //trims white space from the beginning and end of the string
        maxlength: [20, "Activity Name cannot be more than 20 characters"] //Custom message to show if name is more than 20 characters
    },
    completed: {
        type:Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', TaskSchema);
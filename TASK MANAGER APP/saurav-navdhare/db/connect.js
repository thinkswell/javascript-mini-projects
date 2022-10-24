const mongoose = require('mongoose');
const connectDB = (connection_string)=>{
    return mongoose.connect(connection_string)
}
module.exports = connectDB;
const express = require('express');
const app = express();
const port = 3000
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

//middleware

app.use(express.static('./public'));
app.use(express.json());

//route
app.get("/hello", (req,res)=>{
    res.send("Task Manager App")
})
app.use('/api/v1/tasks', tasks);

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        //listen
        app.listen(port, console.log(`App is listening on port ${port}`));
        
    } catch (error) {
        console.log(error);
    }
}
start();
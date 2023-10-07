const express = require("express");
const http =require("http"); //creating http server
const {Server} = require("socket.io");
const cors =require("cors");

const app = express();
app.use(cors());
const server= http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

// to listen an event: (connection event)

io.on("connection", (socket)=>{
    // console.log(`User connected: ${socket.id}`);

    //broadcasting the messages to all users from the sender
    socket.on("send-All", (data)=>{
        // console.log(data);
        socket.broadcast.emit("receive_message", data); 
    })

    //to join rooms
    socket.on("join_room", (room)=>{
        // console.log(data);
        socket.join(room);
    })

    //to send message to dedicated users
    socket.on("send_message", (data)=>{
        // console.log(data);
        socket.to(data.room).emit("receive_message", data); 
    })
})

server.listen(3001, ()=>{
    console.log("Server is running.");
})


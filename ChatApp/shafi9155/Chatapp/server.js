const { Socket } = require("dgram");
const express=require("express");
const http=require('http');
const formatMessage=require('./utils/messages')
const {userJoin,getCurrentUser,userLeave,getRomUsers}=require('./utils/users')
const { ISO_8601 } = require("moment");
const path=require("path");
const socketio=require("socket.io");
const app=express();
const server=http.createServer(app);
const io=socketio(server);
//Set static folder
app.use(express.static(path.join(__dirname,"public")));
const botname='chatcord Bot';
// Run when clients connect
io.on('connection',socket=>{
    socket.on('joinroom',({username,room})=>{
      const  user=userJoin(socket.id,username,room);
      socket.join(user.room);
      
        
        socket.emit('message',formatMessage(botname,'Welcome to Chatcord!'));
    
        //Broadcast when user connect
        socket.broadcast.to(user.room).emit('message',formatMessage(botname,`${user.username} has joined the chat`));

        //Send users and room info
        io.to(user.room).emit('roomUsers',{
           room:user.room,
           users:getRomUsers(user.room)
        });
    });
   

   
    //Listen for chatMessage
    socket.on('chatMessage',(msg)=>{
      const user=getCurrentUser(socket.id);
      io.to(user.room).emit('message',formatMessage(user.username,msg));
    })
     //Run when client disconnect
     socket.on('disconnect',()=>{
       const User=userLeave(socket.id);
       if(User){
         io.to(User.room).emit('message',formatMessage(botname,`${User.username} has left the chat`));
         //Send users and room info
        io.to(User.room).emit('roomUsers',{
          room:User.room,
          users:getRomUsers(User.room)
        });
       };
});});

const PORT= 3000 || process.env.PORT;
server.listen(PORT,function(){
    console.log(`Server is running on ${PORT}`)
});
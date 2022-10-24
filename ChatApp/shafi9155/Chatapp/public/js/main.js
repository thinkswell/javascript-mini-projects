const  chatForm =document.getElementById('chat-form');
const roomName=document.getElementById('room-name');
const userList=document.getElementById('users');

const chatMessages=document.querySelector('.chat-messages');
//Get username and room from url 
const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
});
console.log(username,room);
const socket=io();
//Join chatroom
socket.emit('joinroom',{username,room});
//Get room  and users
socket.on('roomUsers',({room,users})=>{
    outputRoomName(room);
    outputUsers(users);
})
//Message from server
socket.on('message',message=>{
    console.log(message);
    outputMessage(message);
    //Scroll Down
    chatMessages.scrollTop=chatMessages.scrollHeight;
});
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
//Get Message text
    const msg=e.target.elements.msg.value;
    //emit message to server
    socket.emit('chatMessage',msg);

    //clear input
     e.target.elements.msg.value='';
     e.target.elements.msg.focus();

});
//Output message to dom
function outputMessage(message){
    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`	<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}
//add room name dom
function outputRoomName(){
roomName.innerText=room;
}
//Add users to Dom
function outputUsers(users){
    userList.innerHTML=`
    ${users.map(user=> `<li>${user.username}</li>`).join('')}`;
}
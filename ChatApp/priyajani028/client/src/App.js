import './App.css';
import io from 'socket.io-client';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
const socket = io.connect("http://localhost:3001");

// socket.on("connect", ()=>{
//   console.log("Connected to server. Socket ID : ", socket.id);
// })

function App() {
  const [msg,setMsg] = useState("");
  const [receivedMsg, setReceivedMsg] = useState("");
  const [room, setRoom] =useState("");
  // const [broadcastMsg, setBroadcastMsg] =useState("");

  const sendToAll=()=>{
    socket.emit("send-All", {msg});
  }

  const joinRoom = ()=>{
    if(room!==""){
      socket.emit("join_room", room);
    }
  };

    const sendMessage=()=>{
      socket.emit("send_message", {msg, room});
    }

  useEffect(()=>{
    socket.on("receive_message", (data)=>{
      //alert(data.msg);
      setReceivedMsg(data.msg);
    })
  },[socket]);

  // useEffect(()=>{
  //   socket.on("receive_message", (data)=>{
  //     //alert(data.msg);
  //     if(data.broadcast){
  //       setBroadcastMsg(data.msg);
  //     }else{
  //       setReceivedMsg(data.msg);
  //     }
  //   })
  // },[socket]);

  return (
      <Container>
        <div className='content'>
          <div className='items'>
            <input placeholder='Enter Room Number' onChange={(event)=>{setRoom(event.target.value)}}/>
            <button onClick={joinRoom}>Join</button>
          </div>
          <div className='items'>
            <input placeholder='Message...' onChange={(event)=>{setMsg(event.target.value)}}/>
            <button onClick={sendMessage}>Send</button>
          </div>
          <div className='items'>
            <input placeholder='Broadcast Message...' onChange={(event)=>{setMsg(event.target.value)}}/>
            <button onClick={sendToAll}>Send To All</button>
          </div>
        </div>
        <div className='msgs'>
            <div className='msg'>
            <h1>Message: </h1>
            {
              receivedMsg
            }
            </div>
            {/* <div className='msg'>
            <h1>Broadcast: </h1>
            {
              broadcastMsg
            }
            </div> */}
        </div>
      </Container>
  );
}

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 3rem;
background-color: #FCE3BA;

.content{
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  padding: 30px 30px;
  border-radius: 7px;
  width: 60%;
  position: relative;
  box-shadow: 0 0 30px -10px;
  
  .items{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;


    input{
      width: 62%;
      padding: 20px;
	    font-size: 20px;
	    outline: none;
	    border: none;
      background-color: #FCE3BA;
      border-radius: 7px;
    }
    button{
      background: #F89267;
	    position: absolute;
	    border: none;
	    padding: 10px;
	    width: 30%;
	    color: #fff;
	    height: 25%;
	    font-size: 20px;
	    right: 0;
      scale: .83;
	    border-radius: 7px;
    }
  }
}

.msgs{
  display: flex;
  width: 100%;
  gap: 5rem;
  align-items: center;
  justify-content:center;
  .msg{
    padding: 30px 30px;
    width: 50%;
    text-align: center;
  }
}

`;

export default App;


//emit means to send that data to everyone who are listening to it

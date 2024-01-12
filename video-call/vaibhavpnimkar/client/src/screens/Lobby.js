import React,{useCallback, useState,useEffect} from 'react'
import { useSocket } from '../contexts/SocketProvider';
import { useNavigate } from 'react-router-dom';


const Lobby = () => {

    const [email, setEmail] = useState('');
    const [room, setRoom] = useState('');

    const socket = useSocket();
    const navigate =useNavigate();
   

    const handleSubmit = useCallback((e)=>{
        e.preventDefault();
       socket.emit("room:join",{email,room});
    },[email,room])

    const joinRoom =useCallback((data)=>{
const {email,room} =data;
navigate(`room/${room}`);
    },[navigate])

    useEffect(() => {
      socket.on('room:join',joinRoom)
    
      return()=>{
        socket.off('room:join',)
      }
      
    }, [])
    
  return (
    <div>
        <h1>Lobby</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>
                Email Id
            </label>
            <input type='email' 
            id='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
<br/>
            <label htmlFor='room'>
              Room No.
            </label>
            <input type='text' 
            id='room'
            value={room}
            onChange={(e)=>setRoom(e.target.value)}/>
            <br/>
            <button>Join</button>
        </form>
    </div>
  )
}

export default Lobby
// server.js
 
const WebSocket = require('ws')
//array 

const usuarios = new Array();
const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
  //agregar
  
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
    let mess = JSON.parse(message);

    if(mess.tipo==1)
    {
      usuarios.push({msg:mess.nombre,socket:ws});

      for(i=0; i<usuarios.length; i++)
      {
      //console.log(usuarios[i]);
      usuarios[i].socket.send(JSON.stringify(mess));
      }

    }else if(mess.tipo == 2)
    {
      for(let i=0; i<usuarios.length; i++)
      {
        usuarios[i].socket.send(JSON.stringify(mess));
      }
    }else if(mess.tipo == 3)
    {
      for(let i=0; i<usuarios.length; i++)
      {
        if(usuarios[i].msg==mess.dest)
        {
          usuarios[i].socket.send(JSON.stringify(mess));
        }
      }
    }
  })
  //ws.send('Hello! Message From Server!!')

});

let parrafo = document.getElementById("parrafoderespuesta");
let usuarios = new Array();
let socket;
let datbox;

//Se declara la estructura del JSON
var list = {
    'datos' :[]
 };

const btnConectaralservidor = document.getElementById("btnConectaralservidor"); //Se crea la union  
const btnMandarmensaje = document.getElementById("btnmandarmensaje");
const listUsuarios = document.getElementById("listusuarios");
const chat = document.getElementById("chat");
const enviar = document.getElementById("enviar");
let messagebox= document.getElementById("message");
let msgpriv = document.getElementById("mensajeparausuario");
let userDest = document.getElementById("usuariomandarmensaje");
let btnPriv = document.getElementById("btnmandarmensaje");

btnConectaralservidor.addEventListener("click", ()=>{

    socket = new WebSocket("ws://localhost:8080");

    let nombre = document.getElementById("inpnombre").value;

    let username = {tipo:1, nombre:nombre};

    socket.onopen = function(e)
    {

    console.log("Conexión para: "+username.nombre);
    socket.send(JSON.stringify(username));

    enviar.addEventListener("click",()=>{
        datbox = {tipo:2,remitente:username.nombre,msg:messagebox.value}

        socket.send(JSON.stringify(datbox));

        messagebox.value = "";
        });

    btnPriv.addEventListener("click", ()=>{

        datbox = {tipo:3,remitente:username.nombre,dest:userDest.value,msg:msgpriv.value};

        socket.send(JSON.stringify(datbox));

        userDest.value="";
        msgpriv.value="";
    })

    };

    
    socket.onmessage = (event) =>
    {
        let evento = JSON.parse(event.data);
        console.log(evento);

        if(evento.tipo == 1)
        {
            let text = `Bienvenido: ${evento.nombre}<br>`
            parrafo.innerHTML =  text;
        }
        if(evento.tipo == 2){

            let text = `${evento.remitente}: ${evento.msg}<br>`;
            console.log(text);
            chat.innerHTML += text;
        }
        if(evento.tipo == 3)
        {
            let text = `${evento.remitente} te dice ${evento.msg}<br>`;
            chat.innerHTML+=text;
        }
    }

    socket.onerror = function(error){
        alert(`[error] ${error.message}`);
    };

    var option = document.createElement("option"); //Creamos la opcion

    for(i=0; i<usuarios.length; i++)
    {
       // document.getElementById("listusuarios").innerHTML += "<option value='"+usuarios[i]+"'>"+usuarios[i]+"</option>"; 
       option.innerHTML = usuarios[i]; //Metemos el texto en la opción
       listUsuarios.appendChild(option); //Metemos la opción en el select

    };
    
});

/*socket.onclose = function(event)
    {
        if(event.wasClean)
        {
            alert(`[close] conexion cerrada limpiamnete, codigo=${event.code} motivo=${event.reason}`);
        } else {
            alert('[close] La conexion se cayo');
        }
    };*/

btnMandarmensaje.addEventListener("click", ()=>{
    
    var mensaje = {
        'mensajedeusuario' :[]
     };

    let nombre = document.getElementById("inpnombre").value;
    let mensajeparausuario = document.getElementById("mensajeparausuario").value;
    let usuriodestinatario = document.getElementById("usuariomandarmensaje").value;

    mensaje.mensajedeusuario.push({
        "nombre": nombre,
        "mensajeparausuario":mensajeparausuario,
        "usuriodestinatario":usuriodestinatario,
        "tipodedatos": "2"
      });

      console.log(mensaje);

    json = JSON.stringify(mensaje); //  la lista de objetos en Json
    var obj = JSON.parse(json); //Parsea el Json al objeto anterior.
})




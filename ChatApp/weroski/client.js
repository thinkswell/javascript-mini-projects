// client.js
 
const WebSocket = require('ws')
const url = 'ws://localhost:8080'
const connection = new WebSocket(url)
 
connection.onopen = () => {
  
  /*function getRandom() {
    return Math.random() * (10 - 1) + 1;
  }*/

  connection.send('Message From last Client') 

}
 
connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}
 
connection.onmessage = (e) => {
  console.log(e.data)
}
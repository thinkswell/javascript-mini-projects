const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});
const messages = {};
const sockets = {};

const addSocket = (roomName, socket) => {
  if (sockets[roomName]) {
    sockets[roomName].push(socket);
  } else {
    sockets[roomName] = [socket];
  }
};

const addUserMessage = (roomName, userName, message) => {
  messages[roomName].push({
    userName,
    message,
    datetime: new Date().toISOString().split("T")[1].split(".")[0],
    type: "user",
  });
  sendMessages(roomName);
};

const addSystemMessage = (roomName, message) => {
  messages[roomName].push({
    message,
    datetime: new Date().toISOString().split("T")[1].split(".")[0],
    type: "system",
  });
  sendMessages(roomName);
};

const sendMessages = (roomName) => {
  sockets[roomName].forEach((roomSocket) => {
    roomSocket.emit("messages", messages[roomName]);
  });
};

io.on("connection", (socket) => {
  const { userName, roomName } = socket.handshake.query;
  if (messages[roomName] === undefined) messages[roomName] = [];

  addSocket(roomName, socket);
  addSystemMessage(roomName, `${userName} has entered this room`);

  socket.on("new message", (message) => {
    addUserMessage(roomName, userName, message);
  });
  socket.on("disconnect", () => {
    addSystemMessage(roomName, `${userName} has left this room`);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

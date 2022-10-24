<template>
  <div class="app">
    <div v-if="ready" class="chat-window-wrapper">
      <ChatWindow
        :roomName="roomName"
        :messages="messages"
        @send="sendMessage"
        @back="signOut"
      />
    </div>
    <SignInForm v-else class="sign-in-form" @submit="signIn" />
  </div>
</template>

<script>
import SignInForm from "./components/SignInForm.vue";
import ChatWindow from "./components/ChatWindow.vue";
import { io } from "socket.io-client";
export default {
  components: {
    SignInForm,
    ChatWindow,
  },
  data() {
    return {
      socket: null,
      ready: false,
      userName: "",
      roomName: "",
      messages: [],
    };
  },
  methods: {
    signIn({ userName, roomName }) {
      this.ready = true;
      this.userName = userName;
      this.roomName = roomName;
      this.socket = io("ws://localhost:3000", {
        query: { userName, roomName },
      });
      this.socket.on("messages", (messages) => {
        this.messages = messages.map((message) => ({
          ...message,
          isOwn: message.userName === this.userName,
        }));
      });
    },
    signOut() {
      this.socket?.disconnect();
      this.userName = "";
      this.roomName = "";
      this.ready = false;
    },
    sendMessage(message) {
      this.socket?.emit("new message", message);
    },
  },
};
</script>

<style scoped lang="scss">
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #2af598 0%, #009efd 100%);

  .sign-in-form {
    width: 50%;
    max-width: 30rem;
    height: 20rem;
    padding: 1rem;
    box-shadow: 0px 17px 10px -10px rgba(0, 0, 0, 0.4);
  }

  .chat-window-wrapper {
    width: 33%;
    min-width: 25rem;
    height: 90%;
    border-radius: 1rem;
  }
}
</style>

<template>
  <div class="chat-window">
    <div class="header">
      <div class="back-button-wrapper">
        <button @click="$emit('back')">←</button>
      </div>
      <div class="room-name">{{ roomName }}</div>
    </div>
    <div class="content">
      <div
        class="message-wrapper"
        :key="message.datetime"
        v-for="message in messages"
      >
        <template v-if="message.type === 'user'">
          <UserMessage
            :userName="message.userName"
            :datetime="message.datetime"
            :message="message.message"
            :isOwn="message.isOwn"
          />
        </template>
        <div v-else class="system-message">
          {{ message.message }}
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="input-wrapper">
        <input
          class="input"
          v-model="newMessage"
          placeholder="type message"
          @keydown.enter="sendIfEnter"
        />
      </div>
      <button class="send-button" @click="send">Send</button>
    </div>
  </div>
</template>

<script>
import UserMessage from "./UserMessage.vue";
export default {
  components: {
    UserMessage,
  },
  props: {
    messages: {
      type: Array,
      required: true,
    },
    roomName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newMessage: "",
    };
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        const $content = this.$el.querySelector(".content");
        $content.scrollTop = $content.scrollHeight;
      });
    },
  },
  methods: {
    send() {
      if (this.newMessage === "") return;

      this.$emit("send", this.newMessage);
      this.newMessage = "";
    },
    sendIfEnter({ keyCode }) {
      if (keyCode === 13) {
        this.send();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.chat-window {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 1rem;

  .header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 3rem;
    background-color: rgb(85, 50, 131);
    color: #fff;
    .back-button-wrapper {
      position: absolute;
      left: 1rem;
    }
  }
  .content {
    flex: 1;
    background-color: #ddd;
    overflow-y: auto;
    overflow-x: hidden;
    .message-wrapper {
      height: auto;
      margin: 1em;
    }
    .system-message {
      margin: 2em;
      text-align: center;
      font-weight: 600;
    }
  }
  .footer {
    display: flex;
    justify-content: space-around;
    width: 100%;
    min-height: 3rem;
    background-color: #fff;
    .input-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      .input {
        width: 100%;
        height: 70%;
        padding: 1rem;
        margin-left: 1rem;
        background-color: #f9f9f9;
        border-radius: 2rem;
      }
    }
    .send-button {
      min-width: 3.5rem;
      margin: 0.5rem;
      background-color: rgb(151, 245, 182);
      border-radius: 2rem;
    }
  }
}
</style>

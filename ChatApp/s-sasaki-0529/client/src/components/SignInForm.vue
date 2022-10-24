<template>
  <div class="signInForm">
    <h1 class="header">Join</h1>
    <div class="input-wrapper">
      <input v-model="userName" placeholder="user name" />
    </div>
    <div class="input-wrapper">
      <input v-model="roomName" placeholder="room name" />
    </div>
    <div class="button-wrapper">
      <button @click="submit">Sign in</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      roomName: "",
    };
  },
  methods: {
    submit() {
      if (this.userName && this.roomName) {
        this.$emit("submit", {
          userName: this.userName,
          roomName: this.roomName,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.signInForm {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-top: 0.5rem solid #999;
  box-shadow: 1rem;

  .header {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .input-wrapper {
    margin-bottom: 1rem;
    background-color: #ddd;
    input {
      width: 100%;
      height: 2.75rem;
      padding-left: 0.75rem;
    }
  }
  .button-wrapper {
    text-align: right;
    button {
      width: 50%;
      height: 2.5rem;
      background-color: rgb(151, 245, 182);
    }
  }
}
</style>

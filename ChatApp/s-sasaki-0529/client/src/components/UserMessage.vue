<template>
  <div class="user-message" :class="messageClass">
    <div class="meta" :class="messageClass">
      <div class="name">{{ userName }}</div>
      <div class="datetime">{{ datetime }}</div>
    </div>
    <div class="body">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    userName: {
      type: String,
      required: true,
    },
    datetime: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isOwn: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    messageClass() {
      return this.isOwn ? "primary" : "secondary";
    },
  },
};
</script>

<style scoped lang="scss">
.user-message {
  width: 70%;
  height: 100%;
  padding: 0.75rem;
  border-radius: 2rem;
  &.primary {
    background-color: #fff;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: -1.5rem;
      margin-top: -1rem;
      border: 1rem solid transparent;
      border-right: 1rem solid #fff;
    }
  }
  &.secondary {
    position: relative;
    margin-left: 30%;
    background-color: rgb(255, 153, 153);
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: calc(100% - 0.5rem);
      margin-top: -1rem;
      border: 1rem solid transparent;
      border-left: 1rem solid rgb(255, 153, 153);
    }
  }
  .meta {
    display: flex;
    align-items: center;
    .name {
      font-size: 1.1rem;
      font-weight: 600;
      margin-right: 1rem;
    }
    .datetime {
      font-size: 0.9rem;
    }
  }
  .body {
    margin-left: 0.5rem;
  }
}
</style>

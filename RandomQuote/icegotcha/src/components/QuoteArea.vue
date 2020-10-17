<template>
  <div id="quote-area">
    <span class="message">{{ message }}</span>
    <span class="author">{{ author }}</span>
    <button class="btn">Find New Quote</button>
  </div>
</template>

<script>
export default {
  name: 'QuoteArea',
  data () {
    return {
      message: 'Message',
      author: 'Author'
    }
  }
}
</script>

<style scoped>
#quote-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px;
  height: 50%;
}

#quote-area span {
  margin: 20px;
}

#quote-area .message {
  font-size: calc(72px + 1vw);
}

#quote-area .author {
  font-size: calc(36px + 1vw);
}

.btn {
  background-color: #2e70ff;
  border: 3px solid white;
  color: white;
  padding: 16px 32px;
  text-align: center;
  font-size: calc(16px + 1vw);
  margin: 4px 2px;
  text-decoration: none;
  opacity: 1;
  transition: 0.3s;
  cursor: pointer;
}

.btn:hover {
  background-color: transparent;
  border: 3px solid #2e70ff;
  color: #2e70ff;
}
</style>

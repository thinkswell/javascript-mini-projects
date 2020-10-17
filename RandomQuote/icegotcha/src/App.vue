<template>
  <div id="app" class="full-height">
    <QuoteArea />
  </div>
</template>

<script>
import QuoteArea from './components/QuoteArea.vue'

export default {
  name: 'App',
  components: {
    QuoteArea
  }
}
</script>

<style>
html, body {
  height: 100%;
  overflow: hidden;
}

body {
    background: #000000;
}

.full-height {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

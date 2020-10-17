<template>
  <div id="app" class="flex-content">
    <div id="content" class="flex-content">
      <QuoteArea />
      <RefreshButton />
    </div>
    <div id="credit">
        Quotes From: <a href="https://zenquotes.io/">zenquotes.io</a>
    </div>
  </div>
</template>

<script>
import QuoteArea from './components/QuoteArea.vue'
import RefreshButton from './components/RefreshButton'

export default {
  name: 'App',
  components: {
    QuoteArea,
    RefreshButton,
  }
}
</script>

<style>
html, body {
    height: 100%;
    background: #000000;
}

a {
    color: #ffffff;
}

.flex-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  height: 100%;
}

#content {
  flex: 1 0 auto;
}

#credit {
  flex-shrink: 0;
  width: 100%;
}
</style>

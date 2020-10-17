<template>
  <div id="app" class="full-height">
    <QuoteArea />
    <RefreshButton />
  </div>
</template>

<script>
import QuoteArea from './components/QuoteArea.vue'
import RefreshButton from './components/RefreshButton'

export default {
  name: 'App',
  components: {
    QuoteArea,
    RefreshButton
  }
}
</script>

<style>
html, body {
  height: 100%;
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

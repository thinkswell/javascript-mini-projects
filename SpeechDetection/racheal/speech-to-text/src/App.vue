<template>
 <div>
  <speech />
 </div>

</template>

<script>
import Speech from './components/Speech.vue';

export default {
  name: 'App',
  components: {
    Speech
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
    <button class="btn" @click="refresh">Find New Quote</button>
</template>

<script>
export default {
    name: 'RefreshButton',
    methods: {
        refresh: function () {
            window.location.reload()
        }
    }

}
</script>

<style>
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

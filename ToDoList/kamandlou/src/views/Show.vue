<template>
  <div id="show">
    <h1>{{ task.title }}</h1>
    <p>{{ task.description }}</p>
    <button class="btn btn-primary" @click="$router.back()">Back</button>
  </div>
</template>

<script>
import {useRoute} from 'vue-router'
import {computed} from "vue";
import {useStore} from "vuex";

export default {
  name: "Show",
  setup() {
    const route = useRoute()
    const store = useStore()

    const task = computed(() => {
      return store.getters.getTask(route.params.id)
    })
    return {task}
  }
}
</script>

<style scoped>

</style>

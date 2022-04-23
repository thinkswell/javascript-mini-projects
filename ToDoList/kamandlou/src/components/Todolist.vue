<template>
  <div id="todolist">
    <div class="form">
      <button class="btn btn-success" @click="show = !show">Create Task</button>
      <transition name="form">
        <form @submit.prevent="createOrEditTask" v-if="show">
          <label>Title: </label>
          <input type="text" id="title" v-model="payload.title">
          <label>Description: </label>
          <textarea cols="20" rows="5" id="description" v-model="payload.description"></textarea>
          <button class="btn btn-primary create-btn">submit</button>
        </form>
      </transition>
    </div>
    <table class="table">
      <thead class="thead">
      <tr>
        <th>#</th>
        <th>title</th>
        <th>description</th>
        <th>actions</th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr v-for="(task,key) in tasks" v-bind:key="key">
        <td>{{ key + 1 }}</td>
        <td>{{ task.title }}</td>
        <td>{{ task.description.substring(0, 10) }}...</td>
        <td>
          <button class="btn btn-primary" @click="editTask(key)">Edit</button>
          <button class="btn btn-danger" @click="deleteTask(key)">Delete</button>
          <router-link :to="`/task/${key}`">
            <button class="btn btn-success">Show</button>
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {ref, reactive} from "vue";

export default {
  name: "Todolist",
  setup() {
    const store = useStore()
    const tasks = store.state.tasks

    let show = ref(false)
    let payload = reactive({
      key: null,
      title: "",
      description: ""
    })

    const restart = () => {
      show.value = false
      payload.key = null
      payload.title = ''
      payload.description = ''
    }
    const deleteTask = (key) => {
      store.dispatch('deleteTask', key);
    }
    const createOrEditTask = () => {
      store.dispatch('createOrEditTask', payload)
      restart()
    }
    const editTask = (key) => {
      const task = store.getters.getTask(key)
      payload.key = key
      payload.title = task.title
      payload.description = task.description
      show.value = true
    }

    return {tasks, deleteTask, show, payload, createOrEditTask, editTask}
  }
}
</script>

<style scoped>
.table {
  margin: auto;
  border-collapse: collapse;
}

.table th {
  text-transform: capitalize;
}

.table th, td {
  border: 1px solid #ccc;
  padding: 5px 10px;
}

.table tr {
  cursor: pointer;
}

.table tr:nth-child(even) {
  background-color: #e8e7e7;
}

.form {
  margin-bottom: 10px;
}

form {
  padding-top: 10px;
}

label {
  display: block;
  padding: 5px;
}

input, textarea {
  display: block;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 5px;
}

.create-btn {
  margin-top: 5px;
}

.form-enter-active, .form-leave-active {
  transition: opacity .2s;
}

.form-enter-from, .form-leave-to {
  opacity: 0;
}

.form-enter-to, .form-leave-from {
  opacity: 1;
}
</style>

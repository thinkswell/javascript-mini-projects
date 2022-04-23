export default {
    destroyTask(state, key) {
        state.tasks.splice(key, 1)
    },
    storeOrUpdateTask(state, {key, title, description}) {
        if (key !== null) {
            state.tasks[key] = {title, description}
        } else {
            state.tasks.push({title, description})
        }
    }
}

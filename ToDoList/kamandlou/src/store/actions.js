export default {
    deleteTask({commit}, key) {
        commit('destroyTask', key)
    },
    createOrEditTask({commit}, payload) {
        commit('storeOrUpdateTask', payload)
    }
}

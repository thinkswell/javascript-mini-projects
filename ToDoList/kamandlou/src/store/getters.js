export default {
    getTask: (state) => (key) => {
        return state.tasks[key]
    }
}

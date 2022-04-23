import {createApp, nextTick} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/main.css'

const DEFAULT_TITLE = "Todolist"
router.afterEach((to) => {
    nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE
    })
})

createApp(App).use(store).use(router).mount('#app')

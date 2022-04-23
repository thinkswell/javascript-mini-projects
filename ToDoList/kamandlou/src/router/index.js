import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {title: 'Todolist | All Tasks'}
    },
    {
        path: '/task/:id',
        name: 'show',
        component: () => import('../views/Show.vue'),
        meta: {title: 'Todolist | Show Task'}
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

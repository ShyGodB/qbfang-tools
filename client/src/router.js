import Vue from 'vue'
import Router from 'vue-router'

// 原始组件 ---- 一级
import Index from './views/Index.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        }
    ]
})

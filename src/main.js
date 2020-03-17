import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import router from './router/index.js'

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    console.log("进入路由")
    next();
})
router.afterEach((to, from) => {
console.log("离开路由")
})

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
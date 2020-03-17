import Vue from 'vue/dist/vue.js'
import Router from 'vue-router'
import index from '../pages/index'        //首页
import article from '../pages/article'    //文章

Vue.use(Router)

export default new Router({
  routes: [
    {
        // 首页
        path: '/index',
        name: 'index',
        component: index
    },
    {
        // 首页
        path: '/',
        name: 'index',
        component: index
    },
    {
        // 文章页
        path: '/article',
        name: 'article',
        component: article,
        meta: {
            title: '文章'
        }
    }
  ]
})

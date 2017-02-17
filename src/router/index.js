import Vue from 'vue'
import Router from 'vue-router'

import ListView from '../views/List.vue'
import PostView from '../views/Post.vue'
import AboutView from '../views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', name: 'list', component: ListView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/post/:hash', name: 'post', component: PostView }
  ]
})

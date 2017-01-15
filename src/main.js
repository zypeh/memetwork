import Vue from 'vue'
import router from './router'
import App from './App.vue'
import filter from './utils/filter'

// setup Vue filter
filter(Vue)

Vue.config.devtools = process.env.NODE_ENV !== 'production'

// create the app instance and watch it burn
const app = new Vue(
  Vue.util.extend({ router }, App)
).$mount('#app')

export { app, router }

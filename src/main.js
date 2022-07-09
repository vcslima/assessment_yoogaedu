/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardPlugin from './dashboard-plugin'
// import axios from 'axios'

import App from './App.vue'

// router setup
import routes from './routes/routes'
import { http } from './services/HttpService_assessment'


Vue.use(VueRouter)
Vue.use(DashboardPlugin)


var baseDir = "";

const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active',
  mode: 'history',
  base: baseDir,
});


http.interceptors.response.use(undefined, function (error) {
  if(error.response.status === 401) {
     localStorage.clear()
     Object.assign(http.defaults, {headers: {}})
     router.replace('/');
  }
  throw(error)
})

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
});

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

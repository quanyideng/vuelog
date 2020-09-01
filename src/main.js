// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import routes from './routes'
import axios from 'axios'
import Bmob from "hydrogen-js-sdk";
import './icon/style.css'

Bmob.initialize("4d9617821246628a", "703458");
Vue.prototype.$Bmob = Bmob

//全局配置 axios
axios.defaults.baseURL = 'https://vueblog-f782b.firebaseio.com/'

// Vue.use(VueResource)
Vue.use(VueRouter)
Vue.prototype.$eventBus = new Vue()
Vue.config.productionTip = false

//自定义全局指令
// Vue.directive('rainbow', {
//   bind(el, bingding, vnode) {
//     el.style.color = "#" + Math.random().toString(16).slice(2, 8)
//   }
// })

Vue.directive('theme', {
  bind(el, binding, vnode) {
    if (binding.value == 'wide') {
      el.style.maxWidth = '1260px';
    } else if (binding.value == 'narrow') {
      el.style.maxWidth = "660px"
    }

    if (binding.arg == 'column') {
      // el.style.background = "#6677cc"
      el.style.padding = "80px"
    }
  }
})

// 自定义全局过滤器
// Vue.filter('to-uppercase', function (value) {
//   return value.toUpperCase()
// })

Vue.filter('snippet', function (value) {
  return value.slice(0, 100) + "..."
})

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },  
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

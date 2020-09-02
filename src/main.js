import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './routes'
import Bmob from "hydrogen-js-sdk";
import './icon/style.css'
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

Vue.use(VuejsDialog);

Bmob.initialize("4d9617821246628a", "703458");
Vue.prototype.$Bmob = Bmob

Vue.use(VueRouter)
Vue.prototype.$eventBus = new Vue()
Vue.config.productionTip = false

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

Vue.filter('snippet', function (value) {
  return value.slice(0, 100) + "..."
})

const router = new VueRouter({
  mode: 'hash',
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

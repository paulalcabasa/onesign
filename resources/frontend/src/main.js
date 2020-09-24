import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin  } from 'bootstrap-vue'
import axios from 'axios';

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// Axios
Vue.prototype.$axios = axios 

Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import "@/assets/styles/custom.css"

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

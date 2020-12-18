import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/core/services/store";
//import ApiService from "@/core/services/api.service";
import { VERIFY_AUTH } from "@/core/services/store/auth.module";
import { RESET_LAYOUT_CONFIG } from "@/core/services/store/config.module";

Vue.config.productionTip = false;

// Global 3rd party plugins
import "popper.js";
import "tooltip.js";
import PerfectScrollbar from "perfect-scrollbar";
window.PerfectScrollbar = PerfectScrollbar;
import ClipboardJS from "clipboard";
window.ClipboardJS = ClipboardJS;

// Vue 3rd party plugins
//import i18n from "@/core/plugins/vue-i18n";
//import vuetify from "@/core/plugins/vuetify";
import "@/core/plugins/portal-vue";
import "@/core/plugins/bootstrap-vue";
import "@/core/plugins/perfect-scrollbar";
import "@/core/plugins/highlight-js";
import "@/core/plugins/inline-svg";
import "@/core/plugins/apexcharts";
import "@/core/plugins/treeselect";
import "@/core/plugins/metronic";
import "@mdi/font/css/materialdesignicons.css";
import "@/core/plugins/formvalidation";
import axios from 'axios';
import jwtService from '@/core/services/jwt.service';
// API service init
//ApiService.init();

// Remove this to disable mock API
//MockService.init();

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const token = jwtService.getToken();
  config.headers.Authorization = "Bearer " + token;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// axios.interceptors.response.use(function (response) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   return response;
// }, function (error) {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error

//   if (error.response.status === 401) {
//     Promise.all([store.dispatch(REFRESH_TOKEN)]).then(res => {
//       error.config['headers']['Authorization'] = "Bearer " + JwtService.getToken();
//       return axios(error.config);
//     });
//   }  
  
  
//     return Promise.reject(error);
// });

router.beforeEach((to, from, next) => {
  
  Promise.all([store.dispatch(VERIFY_AUTH)]).then(res => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if(!store.getters.isAuthenticated){
        next({ name: 'login' });
      }
      else {
        next()
      }
    }
    else {
      next()
    }
  }); 
  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

// router.beforeEach((to, from, next) => {
//   // Ensure we checked auth before each page load.
//   Promise.all([store.dispatch(VERIFY_AUTH)]).then(next);

//   // reset config to initial state
//   store.dispatch(RESET_LAYOUT_CONFIG);

//   // Scroll page to top on every route change
//   setTimeout(() => {
//     window.scrollTo(0, 0);
//   }, 100);
// });

new Vue({
  router,
  store,
 // i18n,
 // vuetify,
  render: h => h(App)
}).$mount("#app");

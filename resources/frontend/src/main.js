import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import { VERIFY_AUTH } from './store/auth.module';
import { BootstrapVue, IconsPlugin  } from 'bootstrap-vue'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import "@/assets/styles/custom.css"
import tokenService from '@/services/token.service';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


Vue.config.productionTip = false


// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const token = tokenService.getToken();
  config.headers.Authorization = "Bearer " + token;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// refresh token
 const refreshAuthLogic = failedRequest => axios.post('api/auth/refresh').then(tokenRefreshResponse => {
  tokenService.saveToken(tokenRefreshResponse.data.access_token);
  failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.access_token;
  return Promise.resolve();
}); 

createAuthRefreshInterceptor(axios, refreshAuthLogic);

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) => {
	Promise.all([store.dispatch(VERIFY_AUTH)]).then( () => {
		if (to.matched.some(record => record.meta.requiresAuth)) {
			if (!store.getters.isAuthenticated) {
				next({ name : 'login'});
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



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

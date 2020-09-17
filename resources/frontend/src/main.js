import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin  } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import "@/assets/styles/custom.css"

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) => {
  
  	//Promise.all([store.dispatch(VERIFY_AUTH)]).then(res => {
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

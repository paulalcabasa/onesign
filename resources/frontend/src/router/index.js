import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/Login.vue';

import Layout from '@/views/layout/Layout';
Vue.use(VueRouter) 

const routes = [
	{
		path: '/',
		redirect: 'dashboard',
		component: Layout,
		children: [
			{
				path: '/dashboard',
				name: 'dashboard',
				component: Dashboard
			}
		],
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	}
]

const router = new VueRouter({
  routes
})

export default router

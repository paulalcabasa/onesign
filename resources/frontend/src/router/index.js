import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/Login.vue';
import Layout from '@/views/layout/Layout';
import Profile from '@/views/Profile';

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
				component: Dashboard,
				meta : {
					requiresAuth : true
				}
			},
			{
				path: '/profile',
				name : 'profile',
				component : Profile,
				meta : {
					requiresAuth : true
				}
			}
		],
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.VUE_APP_ROUTE_BASE,
	routes
})

export default router

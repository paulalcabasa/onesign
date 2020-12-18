import Vue from "vue";
import Router from "vue-router";
import Layout from "@/view/layout/Layout";
import Dashboard from "@/view/pages/Dashboard.vue";
import Profile from "@/view/pages/profile/Profile.vue";
import Profile4 from "@/view/pages/profile/Profile-4.vue";
import Error from "@/view/pages/error/Error.vue";
import Error1 from "@/view/pages/error/Error-1.vue";
import Login from "@/view/pages/auth/login_pages/Login-1";
Vue.use(Router);

export default new Router({
  mode:"history",
  base: process.env.VUE_APP_ROUTE_BASE,
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: Layout,
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: Dashboard,
          // meta: {
          //   requiresAuth: true,
          //   title: 'Dashboard'
          // }
        }, 
        {
          path: "/profile",
          name: "profile",
          component: Profile,
          children: [
        
            {
              path: "profile-4",
              name: "profile-4",
              component: Profile4
            }
          ]
        }
      ]
    },
    {
      path: "/error",
      name: "error",
      component: Error,
      children: [
        {
          path: "error-1",
          name: "error-1",
          component: Error1
        },  
      ]
    },
    {
      path: "/",
      component: Login,
      children: [
        {
          name: "login",
          path: "/login",
          component: Login
        },
      
      ]
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/view/pages/error/Error-1.vue")
    }
  ]
});

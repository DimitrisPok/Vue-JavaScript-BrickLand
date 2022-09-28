import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Friends from './views/Friends.vue'
import Users from './views/Users.vue'
import SignIn from '../src/views/SignIn.vue'
import Login from '../src/components/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/friends/:id',
      name: 'friends',
      component: Friends
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

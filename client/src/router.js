import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Users from './views/Users.vue'
import SignUp from '../src/components/SignUp.vue'
import Login from '../src/components/Login.vue'
import Review from './views/Reviews.vue'
import Post from './views/Post.vue'
import Posts from './views/Posts.vue'
import SignIn from '../src/views/SignIn.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/SignUp',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: Review
    },
    {
      path: '/post',
      name: 'post',
      component: Post
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    }
  ]
})

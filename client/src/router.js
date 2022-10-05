import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Users from './views/Users.vue'
import SignUp from '../src/components/SignUp2.vue'
import Login from '../src/components/Login.vue'
import Review from './views/Reviews.vue'
import Post from './views/Post.vue'
import Posts from './views/Posts.vue'
import SignIn from '../src/views/SignIn.vue'
import PostView from '../src/views/PostView.vue'
import UserChoice from '../src/views/UserChoice.vue'
import Profile from '../src/views/ProfilePage.vue'
import AdminChoice from '../src/views/AdminChoice.vue'
import AdminLogin from '../src/components/AdminLogin.vue'
import AdminSignUp from '../src/components/AdminSignUp.vue'
import AdminHome from '../src/views/AdminHome.vue'

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
    },
    {
      path: '/posts/:id',
      name: 'posts-view',
      component: PostView,
      params: true
    },
    {
      path: '/Choice',
      name: 'Choice',
      component: UserChoice
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/AdminChoice',
      name: 'AdminChoice',
      component: AdminChoice
    },
    {
      path: '/adminLogin',
      name: 'adminlogin',
      component: AdminLogin
    },
    {
      path: '/adminSignUp',
      name: 'adminsignup',
      component: AdminSignUp
    },
    {
      path: '/adminHome',
      name: 'adminhome',
      component: AdminHome
    }
  ]
})

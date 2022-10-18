import Vue from 'vue'
import Router from 'vue-router'
import Users from './views/Users.vue'
import SignUp from '../src/components/SignUp2.vue'
import Login from '../src/components/Login.vue'
import Post from './views/Post.vue'
import Posts from './views/Posts.vue'
import PostView from '../src/views/PostView.vue'
import Profile from '../src/views/ProfilePage.vue'
import AdminLogin from '../src/components/AdminLogin.vue'
import AdminSignUp from '../src/components/AdminSignUp.vue'
import AdminPosts from '../src/views/AdminPosts.vue'
import Welcome from '../src/views/Welcome.vue'
import AdminPost from '../src/views/AdminPost.vue'
import AdminProfile from '../src/views/AdminProfile'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
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
      path: '/AdminPost',
      name: 'adminpost',
      component: AdminPost
    },
    {
      path: '/AdminPosts',
      name: 'adminposts',
      component: AdminPosts
    },
    {
      path: '/posts/:id',
      name: 'posts-view',
      component: PostView,
      params: true
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile
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
      path: '/adminProfile',
      name: 'adminProlie',
      component: AdminProfile
    }
  ]
})

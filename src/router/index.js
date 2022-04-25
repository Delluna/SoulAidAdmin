import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Login from '../views/Login'
import Index from '../views/Index'
import Home from "../views/Home";

import User from "../views/usr/User";
import Teacher from "../views/usr/Teacher"
import Admin from "../views/usr/Admin"
import Register from "../views/usr/Register"

import Article from "../views/content/Article"
import Video from "../views/content/Video"
import Exercise from "../views/content/Exercise"


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',     //网址上显示的路径
    name: 'Home',
    component: Home,    //上面引入的页面名称
    children: [
      {
        path: '/index',         
        name: 'Index',
        meta: {
          title: "首页"
        },
        component: Index
      },
      {
        path: '/home/usr/user',
        name: 'User',
        component: User
      },
      {
        path: '/home/usr/teacher',
        name: 'Teacher',
        component: Teacher
      },
      {
        path: '/home/usr/admin',
        name: 'Admin',
        component: Admin
      },
      {
        path: '/home/usr/register',
        name: 'Register',
        component: Register
      },
      {
        path: '/home/content/article',
        name: 'Article',
        component: Article
      },
      {
        path: '/home/content/video',        
        name: 'Video',
        component: Video
      },
      {
        path: '/home/content/exercise',
        name: 'Exercise',
        component: Exercise
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import GeneratorComponent from '@/components/GeneratorComponent.vue'
import HomePage from '@/components/HomePage.vue' // 导入新创建的HomePage

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/generator',
    name: 'Generator',
    component: GeneratorComponent
  },
  {
    path: '/home', // 添加首页路由
    name: 'Home',
    component: HomePage
  },
  {
    path: '/',
    redirect: '/login' // 修改默认重定向到首页
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
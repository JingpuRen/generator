import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import HomePage from '@/components/HomePage.vue'
import TextToVideoComponent from '@/components/TextToVideoComponent.vue'
import ImageToVideoComponent from '@/components/ImageToVideoComponent.vue'
import VideoProcessing from '@/components/VideoProcessing.vue'  // 新增导入

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
    path: '/text-to-video',
    name: 'TextToVideo',
    component: TextToVideoComponent
  },
  {
    path: '/image-to-video', 
    name: 'ImageToVideo',
    component: ImageToVideoComponent
  },
  {
    path: '/video-processing',
    name: 'VideoProcessing',
    component: VideoProcessing
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
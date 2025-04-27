import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

// 添加axios默认配置
axios.defaults.baseURL = 'http://localhost:8081' // 确保与vue.config.js中的代理一致
axios.defaults.timeout = 5000

app.config.globalProperties.$axios = axios
app.use(router)
app.use(ElementPlus)
app.mount('#app')
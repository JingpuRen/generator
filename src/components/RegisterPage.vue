<template>
  <div class="register-container">
    <!-- 顶部信息栏 -->
    <div class="top-info-bar">
      <span>短视频创作平台 · 专业视频生成工具</span>
    </div>
    
    <!-- 渐变背景 -->
    <div class="gradient-bg"></div>
    
    <!-- 注册卡片 -->
    <div class="register-card">
      <div class="logo-area">
        <h1>短视频创作平台</h1>
      </div>
      
      <div class="register-header">
        <h2>注册新账号</h2>
        <p>开始您的创作之旅</p>
      </div>
      
      <el-form :model="registerForm" class="register-form">
        <!-- 用户名输入 -->
        <el-form-item>
          <el-input 
            v-model="registerForm.username" 
            placeholder="请输入用户名"
            size="large">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        
        <!-- 密码输入 -->
        <el-form-item>
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
            size="large">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        
        <!-- 确认密码 -->
        <el-form-item>
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="请确认密码"
            show-password
            size="large">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        
        <!-- 注册按钮 -->
        <el-button 
          type="primary" 
          class="register-btn" 
          :loading="loading"
          @click="handleRegister"
          size="large">
          立即注册
        </el-button>
        
        <!-- 登录链接 -->
        <div class="login-link">
          <span>已有账号？</span>
          <el-link type="primary" @click="goLogin">立即登录</el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { User, Lock } from '@element-plus/icons-vue'

export default {
  name: 'RegisterPage',
  components: {
    User,
    Lock
  },
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      loading: false
    };
  },
  methods: {
    handleRegister() {
      // 基本空值检查
      if (!this.registerForm.username || !this.registerForm.password || !this.registerForm.confirmPassword) {
        this.$message.warning('请填写完整信息');
        return;
      }

      this.loading = true;
      
      // 准备发送数据
      const registerData = {
        username: this.registerForm.username,
        password: this.registerForm.password,
        confirmPassword: this.registerForm.confirmPassword  // 添加确认密码字段
      };

      // 发送注册请求
      this.$axios.post('/register', registerData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('完整响应:', response) // 添加调试日志
        if (response.data.code === 200) {
          console.log("接收到数据");
          this.$message.success(response.data.msg || '注册成功');
          this.$router.push('/login');
        } else {
          this.$message.error(response.data.msg || '注册失败');
          this.registerForm = {
            username: '',
            password: '',
            confirmPassword: ''
          };
          this.loading = false; // 添加这行重置loading状态
        }
      })
      .catch(error => {
        const errorMsg = error.response?.data?.message || '注册失败，请稍后重试';
        this.$message.error(errorMsg);
        this.loading = false; // 添加这行重置loading状态
      });
    },
    goLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
/* 添加顶部信息栏样式 */
.top-info-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.register-container {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-top: 40px; /* 为顶部信息栏留出空间 */
}

.gradient-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: 0;
}

.register-card {
  width: 420px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.logo-area {
  text-align: center;
  margin-bottom: 30px;
}

.logo-area h1 {
  color: #303133;
  font-size: 24px;
  font-weight: 600;
}

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.register-header h2 {
  color: #303133;
  font-size: 22px;
  margin-bottom: 8px;
}

.register-header p {
  color: #909399;
  font-size: 14px;
}

.register-form {
  margin-top: 20px;
}

.register-btn {
  width: 100%;
  height: 48px;
  margin-top: 10px;
  font-size: 16px;
  border-radius: 8px;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #606266;
  font-size: 14px;
}

.login-link span {
  margin-right: 8px;
}
</style>
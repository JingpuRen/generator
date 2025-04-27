<template>
  <div class="login-container">
    <!-- 顶部信息栏 -->
    <div class="top-info-bar">
      <span>短视频创作平台 · 专业视频生成工具</span>
    </div>
    
    <!-- 动态背景 -->
    <div class="dynamic-bg"></div>
    
    <!-- 左侧图片区域 -->
    <div class="left-image-area">
      <div class="system-title">
        <h1>短视频生成系统</h1>
        <p class="subtitle">AI赋能 创意无限</p>
      </div>
      <img src="@/assets/login-image.jpg" alt="登录背景图">
    </div>
    
    <!-- 登录卡片 -->
    <div class="login-card">
      <div class="login-header">
        <h2>欢迎回来</h2>
        <p>请登录您的账户</p>
      </div>
      
      <el-form :model="loginForm" class="login-form">
        <!-- 用户名输入 -->
        <el-form-item>
          <el-input 
            v-model="loginForm.username" 
            placeholder="用户名/邮箱"
            @focus="animateInput('username')">
            <template #prefix>
              <img src="@/assets/icons/user-icon.png" class="input-icon" alt="用户图标">
            </template>
          </el-input>
        </el-form-item>
        
        <!-- 密码输入 -->
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            show-password
            @focus="animateInput('password')">
            <template #prefix>
              <img src="@/assets/icons/lock-icon.png" class="input-icon" alt="密码图标">
            </template>
          </el-input>
        </el-form-item>
        
        <!-- 登录按钮 -->
        <el-button 
          type="primary" 
          class="login-btn" 
          :loading="loading"
          @click="handleLogin">
          登 录
        </el-button>
        
        <!-- 注册链接 -->
        <div class="register-link">
          还没有账号? <el-link type="primary" @click="goRegister">立即注册</el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// 修改导入方式
import 'particles.js'
import particlesJS from 'particles.js'

export default {
  name: 'LoginPage',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        remember: false
      },
      loading: false
    };
  },
  mounted() {
    this.initParticles();
  },
  methods: {
    initParticles() {
      // 确保使用正确的调用方式
      if (typeof particlesJS === 'function') {
        particlesJS('particles-js', {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#3a8ee6" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#3a8ee6", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" }
            }
          }
        });
      }
    },
    animateInput(type) {
      // 这里可以添加输入框聚焦动画
      console.log(`${type} input focused`);
    },
    handleLogin() {
      // 基本空值检查
      if (!this.loginForm.username || !this.loginForm.password) {
        this.$message.warning('请输入用户名和密码');
        return;
      }
  
      this.loading = true;
      
      // 准备发送数据
      const loginData = {
        username: this.loginForm.username,
        password: this.loginForm.password
      };
  
      // 发送登录请求
      this.$axios.post('/login', loginData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.data.code === 200) {
          this.$message.success(response.data.msg || '登录成功');
          this.$emit('login-success');
        } else {
          this.$message.error(response.data.msg || '登录失败');
          // 清空表单
          this.loginForm = {
            username: '',
            password: '',
            remember: false
          };
        }
      })
      .catch(error => {
        const errorMsg = error.response?.data?.message || '登录失败，请稍后重试';
        this.$message.error(errorMsg);
      })
      .finally(() => {
        this.loading = false;
      });
    },
    socialLogin(provider) {
      console.log(`Login with ${provider}`);
    },
    goRegister() {
        this.$router.push('/register')
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
  height: 60px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.login-container {
  position: relative;
  height: 110vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.dynamic-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  z-index: 0;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.left-image-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  z-index: 1;
}

.system-title {
  text-align: center;
  margin-bottom: 40px;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.system-title h1 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.system-title .subtitle {
  font-size: 18px;
  opacity: 0.9;
}

.left-image-area img {
  max-width: 80%;
  max-height: 65%;  /* 调整图片高度留出标题空间 */
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  object-fit: contain;
}

.login-card {
  width: 450px;  /* 增大宽度 */
  margin: 60px;  /* 增加外边距 */
  padding: 50px;  /* 增加内边距 */
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;  /* 增大圆角 */
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  z-index: 1;
  align-self: center;
}

/* 调整标题和表单元素大小 */
.login-header h2 {
  font-size: 28px;  /* 增大标题 */
}

.login-form {
  margin-top: 30px;  /* 增加上边距 */
}

.el-input /deep/ .el-input__inner {
  height: 48px;  /* 增大输入框高度 */
  font-size: 16px;
}

.login-btn {
  height: 50px;  /* 增大按钮高度 */
  font-size: 18px;  /* 增大字体 */
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  color: #303133;
  font-size: 24px;
  margin-bottom: 10px;
}

.login-header p {
  color: #909399;
  font-size: 14px;
}

.login-form {
  margin-top: 20px;
}

.login-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.login-btn {
  width: 100%;
  height: 45px;
  font-size: 16px;
  margin-bottom: 20px;
  transition: all 0.3s;
}

.login-btn:hover {
  transform: translateY(-2px);
}

.social-login {
  margin: 20px 0;
}

.divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.divider::before, .divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #dcdfe6;
}

.divider-text {
  padding: 0 15px;
  color: #909399;
  font-size: 12px;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.register-link {
  text-align: center;
  color: #606266;
  font-size: 14px;
}

/* 输入框动画 */
.el-input /deep/ .el-input__inner {
  transition: all 0.3s;
}

.el-input /deep/ .el-input__inner:focus {
  border-color: #3a8ee6;
  box-shadow: 0 0 0 2px rgba(58, 142, 230, 0.2);
}

.input-icon {
  width: 20px;
  height: 20px;
  margin-right: 0;
  vertical-align: middle;
}

/* 调整输入框内边距和前缀位置 */
.el-input /deep/ .el-input__inner {
  padding-left: 10px;  /* 减少左边距 */
}

.el-input /deep/ .el-input__prefix {
  left: 8px;  /* 图标更靠近边框 */
  width: 20px;  /* 固定前缀容器宽度 */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
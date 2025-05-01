<template>
  <div class="home-container">
    <!-- 顶部信息栏 -->
    <div class="top-info-bar">
      <span>短视频创作平台 - 您的专业视频生成工具</span>
      <span class="user-info" v-if="userInfo.nickname">{{ userInfo.nickname }}</span>
    </div>
    
    <!-- 动态背景 -->
    <div class="dynamic-bg"></div>
    
    <!-- 主内容区 -->
    <div class="main-content">
      <h1 class="welcome-title">欢迎使用短视频生成系统</h1>
      <p class="welcome-subtitle">请选择您需要的功能</p>
      
      <div class="feature-cards">
        <!-- 文生视频卡片 -->
        <el-card class="feature-card" @click="goToTextToVideo()">
          <div class="card-content">
            <img src="@/assets/text-icon.png" alt="文生视频">
            <h3>文生视频</h3>
            <p>通过文字描述生成创意短视频</p>
          </div>
        </el-card>
        
        <!-- 图生视频卡片 -->
        <el-card class="feature-card" @click="goToImageToVideo()">
          <div class="card-content">
            <img src="@/assets/image-icon.png" alt="图生视频">
            <h3>图生视频</h3>
            <p>上传图片生成动态视频</p>
          </div>
        </el-card>
        
        <!-- 视频处理卡片 -->
        <el-card class="feature-card" @click="goToVideoProcessing()">
          <div class="card-content">
            <img src="@/assets/video-icon.png" alt="视频处理">
            <h3>视频处理</h3>
            <p>编辑和处理您的视频</p>
          </div>
        </el-card>
        
        <!-- 用户反馈卡片 -->
        <el-card class="feature-card" @click="goToFeedback()">
          <div class="card-content">
            <img src="@/assets/feedback-icon.png" alt="用户反馈">
            <h3>联系我们</h3>
            <p>向我们提出您的宝贵意见</p>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      userInfo: {
        nickname: 'nickname'
      }
    };
  },
  created() {
    console.log('从localStorage获取的account:', localStorage.getItem('account'));
    console.log('从localStorage获取的password:', localStorage.getItem('password'));
    this.fetchUserInfo();
  },
  methods: {
    goToTextToVideo() {
      this.$router.push('/text-to-video');
    },
    goToImageToVideo() {
      this.$router.push('/image-to-video');
    },
    goToFeedback() {
      this.$alert('如有任何问题或建议，请联系我的邮箱：jingpu_ren@163.com', '联系我们', {
        confirmButtonText: '我已知晓',
        callback: () => {
          this.$message({
            type: 'info',
            message: '您的反馈是对我的最大支持！'
          });
        }
      });
    },
    goToVideoProcessing() {
      this.$message.info('视频处理功能即将上线');
    },
    async fetchUserInfo() {
      try {
        const account = localStorage.getItem('account') || '';
        const password = localStorage.getItem('password') || '';
        const response = await this.$axios.post('/user/info', {
          account: account,
          password: password
        }, {
          timeout: 10000
        });
        if (response.data.code === 200) {
          this.userInfo.nickname = response.data.nickname;
        }
      } catch (error) {
        console.error('获取用户信息失败:', error);
        this.$message.error('获取用户信息失败，请检查网络连接');
      }
    }
  }
};
</script>

<style scoped>
.home-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

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
  justify-content: space-between;
  padding: 0 20px;
}

.user-info {
  font-weight: bold;
  margin-right: 50px; /* 添加右侧间距 */
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

.main-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  color: white;
}

.welcome-title {
  font-size: 36px;
  margin-bottom: 10px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.welcome-subtitle {
  font-size: 18px;
  margin-bottom: 40px;
  opacity: 0.9;
}

.feature-cards {
  display: flex;
  justify-content: center;
  gap: 30px;
  width: 100%;
  max-width: 1200px;
}

.feature-card {
  width: 300px;
  height: 350px;
  cursor: pointer;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.9);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100%;
}

.card-content img {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  object-fit: contain; /* 保持原始比例 */
}

.card-content h3 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
}

.card-content p {
  font-size: 16px;
  color: #666;
  text-align: center;
}
</style>
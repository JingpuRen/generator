<template>
  <div class="home-container">
    <!-- 顶部信息栏 -->
    <div class="top-info-bar">
      <span>短视频创作平台 - 您的专业视频生成工具</span>
    </div>
    
    <!-- 动态背景 -->
    <div class="dynamic-bg"></div>
    
    <!-- 主内容区 -->
    <div class="main-content">
      <h1 class="welcome-title">欢迎使用短视频生成系统</h1>
      <p class="welcome-subtitle">请选择您需要的功能</p>
      
      <div class="feature-cards">
        <!-- 文生视频卡片 -->
        <el-card class="feature-card" @click="goToGenerator('textToVideo')">
          <div class="card-content">
            <img src="@/assets/text-icon.png" alt="文生视频">
            <h3>文生视频</h3>
            <p>通过文字描述生成创意短视频</p>
          </div>
        </el-card>
        
        <!-- 图生视频卡片 -->
        <el-card class="feature-card" @click="goToGenerator('imageToVideo')">
          <div class="card-content">
            <img src="@/assets/image-icon.png" alt="图生视频">
            <h3>图生视频</h3>
            <p>上传图片生成动态视频</p>
          </div>
        </el-card>
        
        <!-- 加入社区卡片 -->
        <el-card class="feature-card" @click="goToCommunity">
          <div class="card-content">
            <img src="@/assets/community-icon.png" alt="加入社区">
            <h3>加入社区</h3>
            <p>与创作者交流分享经验</p>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    goToGenerator(type) {
      this.$router.push({
        path: '/generator',
        query: { type }
      });
    },
    goToCommunity() {
      // 这里可以添加跳转到社区页面的逻辑
      this.$message.info('社区功能即将上线');
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
  justify-content: center;
  font-size: 14px;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
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
  image-rendering: -webkit-optimize-contrast; /* 优化渲染 */
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
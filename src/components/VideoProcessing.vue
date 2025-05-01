<template>
  <div class="video-processing">
    <!-- 顶部导航栏 -->
    <div class="top-bar">
      <el-page-header @back="goBack" title="返回主页">
        <template #content>
          <span class="title">视频处理中心</span>
        </template>
      </el-page-header>
    </div>

    <div class="content-container">
      <!-- 上传区域 -->
      <el-card class="upload-card">
        <el-upload
          drag
          action="/api/upload"
          :on-success="handleUploadSuccess"
          :show-file-list="false"
          accept="video/*"
        >
          <el-icon class="upload-icon"><upload-filled /></el-icon>
          <div class="upload-text">
            <p>点击或拖拽视频文件到此处</p>
            <p class="upload-tip">支持MP4、MOV等常见格式</p>
          </div>
        </el-upload>
      </el-card>

      <!-- 处理选项 -->
      <el-card class="options-card" v-if="videoUrl">
        <h3>处理选项</h3>
        <el-form label-position="top">
          <el-form-item label="压缩质量">
            <el-slider v-model="options.compression" :marks="compressionMarks" />
          </el-form-item>

          <el-form-item>
            <div class="button-group">
              <el-button type="primary" @click="processVideo" :loading="processing">
                开始处理
              </el-button>
              <el-button type="success" @click="downloadVideo" v-if="processedUrl">
                <el-icon><download /></el-icon> 下载视频
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-card>

      <!-- 下载按钮 -->
<!--      <el-card class="download-card" v-if="processedUrl">-->
<!--        <div class="action-buttons">-->
<!--          <el-button type="success" @click="downloadVideo">-->
<!--            <el-icon><download /></el-icon> 下载视频-->
<!--          </el-button>-->
<!--        </div>-->
<!--      </el-card>-->
    </div>
  </div>
</template>

<script>
import { UploadFilled, Download } from '@element-plus/icons-vue'

export default {
  name: 'VideoProcessing',
  components: { UploadFilled, Download },
  data() {
    return {
      videoUrl: '',
      processedUrl: '',
      processing: false,
      options: {
        compression: 70
      },
      compressionMarks: {
        0: '低质量',
        50: '中等',
        100: '高质量'
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push('/home')
    },
    handleUploadSuccess(response) {
      this.videoUrl = response.data.url
    },
    async processVideo() {
      this.processing = true
      try {
        const response = await this.$axios.post('/video/process', {
          videoUrl: this.videoUrl,
          options: this.options
        }, {
          timeout: 30000
        })
        console.log('完整响应:', response.data)
        this.processedUrl = response.data.data.processedUrl
        console.log('处理后的视频URL:', this.processedUrl)
      } catch (error) {
        console.error('处理失败:', error)
        this.$message.error('视频处理失败: ' + error.message)
      } finally {
        this.processing = false
      }
    },
    downloadVideo() {
      if (!this.processedUrl) {
        this.$message.warning('没有可下载的视频')
        return
      }
      
      const timestamp = new Date().getTime()
      const filename = `processed-video-${timestamp}.mp4`
      
      // 直接使用处理后的URL下载
      const link = document.createElement('a')
      link.href = this.processedUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      this.$message.success('视频下载已开始')
    }
  }
}
</script>

<style scoped>
.video-processing {
  height: 100vh;
  background-color: #f5f7fa;
}

.top-bar {
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 18px;
  font-weight: 500;
}

.content-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}

.upload-card, .options-card {
  margin-bottom: 20px;
}

.upload-icon {
  font-size: 50px;
  color: var(--el-color-primary);
  margin-bottom: 15px;
}

.upload-text {
  font-size: 16px;
  color: var(--el-text-color-regular);
}

.upload-tip {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-top: 8px;
}

.download-card {
  margin-top: 20px;
}

.action-buttons {
  text-align: center;
  padding: 20px;
}

.button-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-top: 20px;
}
</style>
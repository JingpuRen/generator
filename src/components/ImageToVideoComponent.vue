<template>
  <div class="image-to-video-component">
    <!-- 顶部信息栏 -->
    <div class="top-info-bar">
      <span>短视频生成系统之图生视频</span>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <h3>图片生视频</h3>
          <el-form ref="form" :model="formData" label-width="auto" label-position="top">
            <el-form-item label="提示词 (Prompt)" required>
              <el-input 
                v-model="formData.prompt" 
                type="textarea" 
                :rows="4"
                resize="none"
                style="width: 100%; min-height: 100px; max-width: none">
              </el-input>
            </el-form-item>
            <el-form-item label="图片上传" required>
              <el-upload
                  action="/api/upload"
                  list-type="picture-card"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :file-list="formData.fileList">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="负面提示词 (Negative Prompt)">
              <el-input 
                v-model="formData.negative_prompt" 
                type="textarea" 
                :rows="4"
                resize="none"
                style="width: 100%; min-height: 100px; max-width: none">
              </el-input>
            </el-form-item>
            <el-form-item label="推理步数 (Num Inference Steps)">
              <el-input-number v-model="formData.num_inference_steps" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="引导比例 (Guidance Scale)">
              <el-input-number v-model="formData.guidance_scale" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="随机种子 (Seed)">
              <el-input-number v-model="formData.seed" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item class="button-center">
              <el-button type="primary" @click="sendData" :disabled="isButtonDisabled">
                {{ buttonText }}
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card bigger-card">
          <h3>视频展示</h3>
          <div v-if="loading">
            <el-progress :percentage="progressPercent" :status="progressStatus" />
            <div class="loading-spinner"></div>
          </div>
          <div v-else-if="videoUrl" class="video-container">
            <video ref="videoPlayer" controls width="100%" height="430px">
              <source :src="videoUrl" type="video/mp4">
            </video>
            <div class="video-actions">
              <el-button type="primary" @click="downloadVideo">下载视频</el-button>
              <el-button type="success" @click="shareToWeibo">分享到微博</el-button>
            </div>
          </div>
          <div v-else>
            <el-empty description="请上传图片并设置参数"></el-empty>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ImageToVideoComponent',
  data() {
    return {
      formData: {
        prompt: '',
        image_url: '',
        negative_prompt: '',
        num_inference_steps: 0,
        guidance_scale: 0,
        seed: null,
        fileList: [] // 存储上传的文件列表
      },
      videoUrl: '',
      isButtonDisabled: false,
      buttonText: 'Generate'
    };
  },
  methods: {
    handlePreview(file) {
      console.log('Preview:', file);
    },
    handleRemove(file, fileList) {
      console.log('Remove:', file, fileList);
    },
    handleSuccess(response) {
      console.log('Upload success:', response);
      this.formData.image_url = response.data.url;
    },
    async sendData() {
      if (!this.formData.prompt || !this.formData.image_url) {
        console.error('Prompt and Image URL are required.');
        return;
      }
      this.isButtonDisabled = true;
      this.buttonText = 'Loading...';
      try {
        const requestData = {
          prompt: this.formData.prompt,
          image_url: this.formData.image_url,
          negative_prompt: this.formData.negative_prompt,
          num_inference_steps: this.formData.num_inference_steps,
          guidance_scale: this.formData.guidance_scale,
          seed: this.formData.seed
        };
        console.log(requestData);
        const response = await axios.post('/ImageToVideo', requestData, {
          timeout: 300000 // 将超时时间延长到30秒
        });
        console.log('后端返回的响应:', response); // 输出后端返回的数据
        this.videoUrl = response.data.url;
      } catch (error) {
        console.error('请求出错:', error);
        this.$message.error('请求超时，请稍后再试或检查网络连接');
      } finally {
        this.isButtonDisabled = false;
        this.buttonText = 'Generate';
      }
    },
    downloadVideo() {
      if (!this.videoUrl) {
        this.$message.warning('请先生成视频');
        return;
      }
      
      const now = new Date();
      const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
      const filename = `generated-video-${timestamp}.mp4`;
      
      fetch(this.videoUrl)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          this.$message.success('视频下载成功');
        })
        .catch(error => {
          console.error('下载失败:', error);
          this.$message.error('视频下载失败');
        });
    },
    
    shareToWeibo() {
      if (!this.videoUrl) {
        this.$message.warning('请先生成视频');
        return;
      }
      const shareUrl = `http://service.weibo.com/share/share.php?url=${encodeURIComponent(this.videoUrl)}&title=我用AI生成的视频`;
      window.open(shareUrl, '_blank', 'width=550,height=400');
    }
  }
};
</script>

<style scoped>
.image-to-video-component {
  padding: 20px;
  height: calc(100vh - 40px);
}
.el-row {
  height: 100%;
}
.el-col {
  height: 100%;
  display: flex;
}
.box-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto; /* 添加滚动条以防内容过长 */
}
.bigger-card {
  height: 100%;
}
.button-center {
  text-align: center;
}
.el-form-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
.el-upload, .el-input-number {
  margin: 0 auto;
}
.box-card {
  margin-bottom: 20px;
}
.video-display {
  margin-top: 20px;
}

.image-preview {
  margin-top: 10px;
  border: 1px dashed #d9d9d9;
  padding: 8px;
  text-align: center;
}

.video-actions {
  margin-top: 10px;
  text-align: center;
}

.video-container {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  padding: 0 20px;
  z-index: 100;
}
</style>
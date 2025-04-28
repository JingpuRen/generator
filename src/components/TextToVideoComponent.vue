<template>
  <div class="text-to-video-component">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <h3 style="text-align: center;">文生视频</h3>
          <el-form ref="form" :model="formData" label-width="auto" label-position="top">
            <el-form-item label="提示词 (Prompt)">
              <el-input v-model="formData.prompt"></el-input>
            </el-form-item>
            <el-form-item label="负面提示词 (Negative Prompt)">
              <el-input v-model="formData.negative_prompt"></el-input>
            </el-form-item>
            <el-form-item label="推理步数 (Num Inference Steps)">
              <el-input-number v-model="formData.num_inference_steps" :min="0" class="center-align"></el-input-number>
            </el-form-item>
            <el-form-item label="引导比例 (Guidance Scale)">
              <el-input-number v-model="formData.guidance_scale" :min="0" class="center-align"></el-input-number>
            </el-form-item>
            <el-form-item label="随机种子 (Seed)">
              <el-input-number v-model="formData.seed" :min="0" class="center-align"></el-input-number>
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
            <div class="loading-spinner"></div>
          </div>
          <video v-else-if="videoUrl" controls width="100%" height="430px">
            <source :src="videoUrl" type="video/mp4">
            您的浏览器不支持视频播放。
          </video>
          <div v-else>
            <p>Waiting for your input...</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TextToVideoComponent',
  data() {
    return {
      formData: {
        prompt: '',
        negative_prompt: '',
        num_inference_steps: 0,
        guidance_scale: 0,
        seed: null
      },
      videoUrl: '',
      loading: false,
      isButtonDisabled: false,
      buttonText: 'Run'
    };
  },
  methods: {
    async sendData() {
      this.isButtonDisabled = true;
      this.loading = true;
      this.buttonText = 'Loading...';
      try {
        const requestData = {
          prompt: this.formData.prompt,
          negative_prompt: this.formData.negative_prompt,
          num_inference_steps: this.formData.num_inference_steps,
          guidance_scale: this.formData.guidance_scale
        };

        if (this.formData.seed !== null) {
          requestData.seed = this.formData.seed;
        }

        const response = await axios.post('/generator', requestData, {
          timeout: 150000 // 将超时时间延长到15秒
        });
        this.videoUrl = response.data.url;
        console.log(response.data.url);
      } catch (error) {
        console.error('请求出错:', error);
        this.$message.error('请求超时，请稍后再试或检查网络连接'); // 添加用户提示
      } finally {
        this.loading = false;
        this.isButtonDisabled = false;
        this.buttonText = 'Run';
      }
    }
  }
};
</script>

<style scoped>
.text-to-video-component {
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
  overflow-y: auto;
}
.bigger-card {
  height: 100%;
}
.box-card {
  margin-bottom: 20px;
}
.bigger-card {
  min-height: 500px;
}
.button-center {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}

.button-center .el-button {
  width: 700px; /* 设置固定宽度 */
  height: 40px; /* 设置固定高度 */
  font-size: 16px; /* 设置字体大小 */
}
.center-align {
  width: 100%;
  display: flex;
  justify-content: center;
}
.loading-spinner {
  width: 350px;
  height: 350px;
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
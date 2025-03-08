<template>
  <div class="image-to-video-component">
    <el-card class="box-card">
      <h3>图片生视频</h3>
      <el-form ref="form" :model="formData" label-width="auto" label-position="top">
        <el-form-item label="提示词 (Prompt)" required>
          <el-input v-model="formData.prompt"></el-input>
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
          <el-input v-model="formData.negative_prompt"></el-input>
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
    <el-card class="box-card video-display" v-if="videoUrl">
      <h3>生成的视频</h3>
      <video controls width="100%" height="430px">
        <source :src="videoUrl" type="video/mp4">
        您的浏览器不支持视频播放。
      </video>
    </el-card>
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
        const response = await axios.post('/api/ImageToVideo', requestData);
        console.log('后端返回的响应:', response); // 输出后端返回的数据
        this.videoUrl = response.data.url;
      } catch (error) {
        console.error('请求出错:', error);
      } finally {
        this.isButtonDisabled = false;
        this.buttonText = 'Generate';
      }
    }
  }
};
</script>

<style scoped>
.image-to-video-component {
  padding: 20px;
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
</style>
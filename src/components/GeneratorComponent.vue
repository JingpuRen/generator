<template>
  <div class="generator-component">
    <el-row :gutter="20">
      <!-- 添加下拉选择器 -->
      <el-col :span="24">
        <el-select v-model="selectedOption" placeholder="选择生成类型" @change="handleSelectionChange">
          <el-option label="文生视频" value="textToVideo"></el-option>
          <el-option label="图片生视频" value="imageToVideo"></el-option>
        </el-select>
      </el-col>
      <!-- 左边收集数据区域 -->
      <el-col :span="12" v-if="selectedOption === 'textToVideo'">
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
      <el-col :span="12" v-if="selectedOption === 'imageToVideo'">
        <!-- 图片生视频的表单和展示 -->
        <ImageToVideoComponent />
      </el-col>
      <!-- 右边展示视频区域 -->
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
import { ElRow, ElCol, ElCard, ElForm, ElFormItem, ElInput, ElInputNumber, ElButton, ElSelect, ElOption } from 'element-plus';
import ImageToVideoComponent from './ImageToVideoComponent.vue'; // 新增的组件

export default {
  name: 'GeneratorComponent',
  components: {
    ElRow,
    ElCol,
    ElCard,
    ElForm,
    ElFormItem,
    ElInput,
    ElInputNumber,
    ElButton,
    ElSelect,
    ElOption,
    ImageToVideoComponent
  },
  data() {
    return {
      selectedOption: 'textToVideo', // 默认选择文生视频
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
    handleSelectionChange(value) {
      // 根据选择的值切换页面
      console.log('Selected:', value);
    },
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

        if (this.formData.seed!== null) {
          requestData.seed = this.formData.seed;
        }

        const response = await axios.post('/api/generator', requestData);
        this.videoUrl = response.data.url;
        console.log(response.data.url);
      } catch (error) {
        console.error('请求出错:', error);
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
.generator-component {
  padding: 20px;
}
.box-card {
  width: 100%;
}
.bigger-card {
  height: 533px; /* 设置固定高度，可按需调整 */
}
.el-form-item__label {
  text-align: center;
  padding: 0;
  display: block;
  width: 100%;
}
.el-form-item {
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.center-align {
  margin: 0 auto;
}
.button-center {
  text-align: center;
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

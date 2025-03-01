<template>
  <div class="generator-component">
    <el-row :gutter="20">
      <!-- 左边收集数据区域 -->
      <el-col :span="12">
        <el-card class="box-card">
          <h3 style="text-align: center;">数据输入</h3>
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
              <el-button type="primary" @click="sendData">Run</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <!-- 右边展示视频区域 -->
      <el-col :span="12">
        <el-card class="box-card">
          <h3>视频展示</h3>
          <video v-if="videoUrl" controls width="100%" height="300px">
            <source :src="videoUrl" type="video/mp4">
            您的浏览器不支持视频播放。
          </video>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import { ElRow, ElCol, ElCard, ElForm, ElFormItem, ElInput, ElInputNumber, ElButton } from 'element-plus';

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
    ElButton
  },
  data() {
    return {
      formData: {
        prompt: '',
        negative_prompt: '',
        num_inference_steps: 0,
        guidance_scale: 0,
        seed: null
      },
      videoUrl: ''
    };
  },
  methods: {
    async sendData() {
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
      } catch (error) {
        console.error('请求出错:', error);
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
.el-form-item__label {
  text-align: center; /* 将标签文本改为居中对齐 */
  padding: 0;
  display: block;
  width: 100%;
}
.el-form-item {
  margin-bottom: 15px;
  display: flex;
  justify-content: center; /* 使表单项内的子元素水平居中 */
  align-items: center; /* 使表单项内的子元素垂直居中（如果有需要） */
  flex-direction: column; /* 子元素垂直排列 */
}
.center-align {
  margin: 0 auto; /* 使输入框在表单项中水平居中 */
}
.button-center {
  text-align: center;
}
</style>

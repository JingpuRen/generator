<template>
  <div>
    <!-- 原有表单部分 -->
    <form @submit.prevent="sendData">
      <label for="prompt">提示词 (prompt):</label>
      <input type="text" id="prompt" v-model="prompt" required><br>
      <label for="negative_prompt">负面提示词 (negative_prompt):</label>
      <input type="text" id="negative_prompt" v-model="negative_prompt" required><br>
      <label for="num_inference_steps">推理步数 (num_inference_steps):</label>
      <input type="number" id="num_inference_steps" v-model.number="num_inference_steps" required><br>
      <label for="guidance_scale">引导比例 (guidance_scale):</label>
      <input type="number" id="guidance_scale" v-model.number="guidance_scale" required><br>
      <label for="seed">随机种子 (seed):</label>
      <input type="number" id="seed" v-model.number="seed"><br>
      <button type="submit">发送数据</button>
    </form>
    <!-- 视频展示部分 -->
    <video v-if="videoUrl" controls width="640" height="360">
      <source :src="videoUrl" type="video/mp4">
      您的浏览器不支持视频播放。
    </video>
    <!-- 新增获取返回状态按钮及结果展示 -->
    <button @click="getReturnStatus">获取返回状态</button>
    <p v-if="returnMsg">{{ returnMsg }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TestComponent',
  data() {
    return {
      prompt: '',
      negative_prompt: '',
      num_inference_steps: 0,
      guidance_scale: 0,
      seed: null,
      videoUrl: '',
      returnMsg: ''
    };
  },
  methods: {
    // 发送表单数据获取视频 URL 的方法
    async sendData() {
      try {
        const requestData = {
          prompt: this.prompt,
          negative_prompt: this.negative_prompt,
          num_inference_steps: this.num_inference_steps,
          guidance_scale: this.guidance_scale
        };
        if (this.seed !== null) {
          requestData.seed = this.seed;
        }
        const response = await axios.post('/api/generator', requestData);
        this.videoUrl = response.data.url;
      } catch (error) {
        console.error('请求出错:', error);
      }
    },
    // 获取后端 /return 接口返回状态的方法
    async getReturnStatus() {
      try {
        const response = await axios.get('/api/return');
        // 假设返回的是 JSON 对象，直接获取 msg 字段
        if (response.data && response.data.msg) {
          this.returnMsg = response.data.msg;
        } else {
          this.returnMsg = '未获取到有效信息';
        }
      } catch (error) {
        console.error('获取返回状态出错:', error);
        this.returnMsg = '请求出错，请检查控制台日志';
      }
    }
  }
};
</script>

<style scoped>
/* 可以在这里添加组件的样式 */
</style>

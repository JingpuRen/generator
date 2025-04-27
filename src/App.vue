<template>
  <div id="app">
    <router-view v-if="!isLoggedIn"></router-view>
    <GeneratorComponent v-else />
  </div>
</template>

<script>
import GeneratorComponent from './components/GeneratorComponent.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  components: {
    GeneratorComponent
  },
  data() {
    return {
      isLoggedIn: false
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  }
};
</script>

<style>
/* 添加全局样式消除默认边距 */
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

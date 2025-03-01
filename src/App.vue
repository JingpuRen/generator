<template>
  <div id="app">
    <GeneratorComponent />
  </div>
</template>

<script>
import GeneratorComponent from './components/GeneratorComponent.vue'; // 修改导入路径和组件名

export default {
  name: 'App',
  components: {
    GeneratorComponent
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

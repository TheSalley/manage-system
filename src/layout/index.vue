<template>
  <div class="app-wrapper">
    <div></div>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <div>
        <navbar />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import navbar from "./components/navbar/index.vue";
import sidebar from "./components/sidebar/index.vue";
</script>
<style lang="less" scoped>

</style>
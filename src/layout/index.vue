<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handle_click_outside"
    ></div>
    <sidebar_com class="sidebar-container" />
    <div
      :class="{ hasTagsView: default_setting.tagsView }"
      class="main-container"
    >
      <div :class="{ 'fixed-header': default_setting.fixedHeader }">
        <navbar_com />
      </div>
      <app_main_com />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import navbar_com from "./components/navbar/index.vue";
import sidebar_com from "./components/sidebar/index.vue";
import app_main_com from "./components/app_main/index.vue"
import { use_setting_store } from "@/store/setting";

const { default_setting, sidebar, device } = storeToRefs(use_setting_store());

const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === "mobile",
  };
});

const handle_click_outside = () => {};
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.module.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>

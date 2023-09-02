<template>
  <div :class="{ 'has-logo': default_setting.sidebarLogo }">
    <logo v-if="default_setting.sidebarLogo" :collapse="sidebar.opened" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        default-active="2"
        text-color="#fff"
        :collapse="sidebar.opened"
        mode="vertical"
      >
        <el-menu-item>
          <sidebarItem
            v-for="route in permission_routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { use_user_store } from "@/store/user";
import { use_setting_store } from "@/store/setting";
import logo from "@/layout/components/sidebar/components/logo.vue";
import sidebarItem from "@/layout/components/sidebar/components/sidebarItem.vue";

const route = useRoute();
const { permission_routes } = storeToRefs(use_user_store());
const { default_setting, sidebar } = storeToRefs(use_setting_store());

const activeMenu = () => {
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
};
</script>

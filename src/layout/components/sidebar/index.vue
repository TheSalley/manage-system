<template>
  <div :class="{ 'has-logo': default_setting.sidebarLogo }">
    <logo v-if="default_setting.sidebarLogo" :collapse="sidebar.opened" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="sidebar.opened"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebarItem
          v-for="r in permission_routes"
          :key="r.path"
          :item="r"
          :base-path="r.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { use_user_store } from "@/store/user";
import { use_setting_store } from "@/store/setting";
import logo from "@/layout/components/sidebar/components/logo.vue";
import sidebarItem from "@/layout/components/sidebar/components/sidebarItem.vue";
import variables from "@/styles/variables.module.scss";

const route = useRoute();
const { permission_routes } = storeToRefs(use_user_store());
const { default_setting, sidebar } = storeToRefs(use_setting_store());

const activeMenu = computed(() => {
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
</script>

<template>
  <div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
    >
      <el-menu-item>
        <sidebarItem v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { use_user_store } from "@/store/user"
import sidebarItem from "@/layout/components/sidebar/components/sidebarItem.vue";

const { permission_routes } = storeToRefs(use_user_store())
</script>
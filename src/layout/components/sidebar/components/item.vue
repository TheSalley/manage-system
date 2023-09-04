<template>
  <icon_com :icon="icon" />
  <span slot="title">{{ title }}</span>
</template>

<script setup lang="ts">
import icon_com from "@/component/icon_com/index.vue";
defineProps({
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>

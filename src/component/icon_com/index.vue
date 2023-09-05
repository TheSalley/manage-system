<template>
  <component :is="icon_list[icon]" />
</template>
<script setup lang="ts">
import { ref } from "vue";
defineProps({
  icon: {
    type: String,
    default: "",
  },
});

const icon_list = ref({
  list: IEpList,
  user: IEpUser,
  lock: IEpLock,
});
</script>

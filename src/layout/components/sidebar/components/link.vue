<template>
  <component v-bind:="linkProps(to)">
    <slot />
  </component>
</template>
<script setup lang="ts">
import { isExternal } from "@/utils/validate";

defineProps({
  to: {
    type: String,
    required: true,
  },
});

const linkProps = (url) => {
  if (isExternal(url)) {
    return {
      is: "a",
      href: url,
      target: "_blank",
      rel: "noopener",
    };
  }
  return {
    is: "router-link",
    to: url,
  };
};
</script>

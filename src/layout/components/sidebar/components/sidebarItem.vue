<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <div v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.name)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item_com
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </div>
    </template>
    <el-sub-menu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
    >
      <template #title>
        <item_com
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>

      <sidebar_item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>
<script lang="ts">
export default {
  name: "sidebar_item",
};
</script>
<script setup lang="ts">
import { ref } from "vue";
import path from "path-browserify";
import { isExternal } from "@/utils/validate";
import app_link from "./link.vue";
import item_com from "./item.vue";

const props = defineProps({
  item: {
    type: Object,
    requred: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: "",
  },
});

const onlyOneChild = ref(null);

const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter((item: any) => {
    if (item.hidden) {
      return false;
    } else {
      onlyOneChild.value = item;
      return true;
    }
  });
  if (showingChildren.length === 1) {
    return true;
  }
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }
  return false;
};

const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
};
</script>

<template>
  <div  class="menu-wrapper">
    <template v-if="true">
      <el-menu-item>{{ item.meta.title }}</el-menu-item>

    </template>

  </div>
  <div class="menu-wrapper">
    <template>
        <el-menu-item>
          <div>
            <!-- <i>{{ item.meta.icon }}</i> -->
            <span>{{ item }}</span>
          </div>
        </el-menu-item>
    </template>
    <!-- <el-submenu v-else>
      <template slot="title">
        <div>
          <i>{{ item.meta.icon }}</i>
          <span>{{ item.meta.title }}</span>
        </div>
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :is-nest="true"
          :item="child"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-submenu> -->
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import path from "path";
import { isExternal } from "@/utils/validate";

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
    if (showingChildren.length === 1) {
      return true;
    }
    if (showingChildren.length === 0) {
      onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
      return true;
    }
    return false;
  });
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

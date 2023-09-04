import { defineStore } from "pinia";
import { ref } from "vue";

export const use_tagView_store = defineStore(
  "tagView_store",
  () => {
    const visitedViews = ref([]);
    const cachedViews = ref([]);
    return {
      visitedViews,
      cachedViews,
    };
  },
  {
    persist: true,
  }
);

import { defineStore } from "pinia";
import { ref } from "vue";

export const use_iframe_store = defineStore("iframe_store", () => {
  const drawer_visiable = ref(false);

  let change_drawer_visiable = (v) => {
    console.log(v)
    drawer_visiable.value = v;
  };

  return {
    drawer_visiable,
    change_drawer_visiable,
  };
});

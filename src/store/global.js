import { defineStore } from "pinia";
import { ref } from "vue";
import { request_table_data } from "../api/index";
import { ElLoading } from "element-plus";
import { PROJECT_TEMPLATE, AD_TEMPLATE } from "../enum/constant";

export const use_global_store = defineStore(
  "global_store",
  () => {
    const mode = ref("local");
    const project_info = ref(PROJECT_TEMPLATE);
    const ad_info = ref(AD_TEMPLATE);
    const ad_count = ref(1);
    const is_which_operate = ref(0);
    const launch_type = ref("");

    let change_project_info = async (v, name, name1) => {
      if (name1) {
        project_info.value[name][name1] = v;
      } else {
        project_info.value[name] = v;
      }
    };

    let change_ad_info = async (v, name, name1) => {
      if (name1) {
        ad_info.value[name][name1] = v;
      } else {
        ad_info.value[name] = v;
      }
    };

    let change_is_which_operate = (v) => {
      is_which_operate.value = v;
    };

    let reset_project_and_ad = () => {
      project_info.value = PROJECT_TEMPLATE;
      ad_info.value = AD_TEMPLATE;
      ad_count.value = 1;
    };

    let set_project_info = (v) => {
      project_info.value = v;
    };

    let set_ad_info = (v) => {
      ad_info.value = v;
    };

    return {
      mode,
      project_info,
      change_project_info,
      set_project_info,
      ad_info,
      change_ad_info,
      set_ad_info,
      reset_project_and_ad,
      ad_count,
      is_which_operate,
      change_is_which_operate,
      launch_type,
    };
  },
  {
    persist: false,
  }
);

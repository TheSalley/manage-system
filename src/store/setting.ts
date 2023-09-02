import { defineStore } from "pinia";
import { ref } from "vue";
import Cookies from "js-cookie";
import variables from "@/styles/element-variables.scss";

export const use_setting_store = defineStore(
  "setting_store",
  () => {
    const theme: any = ref(variables.theme);
    const default_setting: any = ref({
      appid: "ty9fd2848a039ab554",
      appSecret: "ec32286d0718118861afdbf6e401ee81",
      cookieExpires: 1,
      uploadUrl: {
        img: "/admin/upload/upimg",
        video: "",
        file: "",
      },
      title: "后台管理系统",
      showSettings: true,
      tagsView: true,
      fixedHeader: false,
      sidebarLogo: true,
    });
    const sidebar: any = ref({
      opened: Cookies.get("sidebarStatus") ? false : true,
      withoutAnimation: false,
    });
    const device = ref("desktop");
    const size = ref(Cookies.get("size") || "medium");

    return {
      theme,
      default_setting,
      sidebar,
      device,
      size,
    };
  },
  {
    persist: true,
  }
);

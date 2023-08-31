import axios from "axios";
import qs from "qs";
import setting from "@/setting/index";
import { storeToRefs } from "pinia";
import { use_user_store } from "@/store/user";
import { getToken } from "@/utils/auth";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {},
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
});

service.interceptors.request.use(
  function (config) {
    config.headers["x-access-appid"] = setting["appid"];
    const { user_info } = storeToRefs(use_user_store());
    if (user_info.value?.token) {
      config.headers["x-access-token"] = getToken();
    }
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // dataAxios 是 axios 返回数据中的 data
    // const dataAxios = response.data;
    // // 这个状态码是和后端约定的
    // const code = dataAxios.reset;
    // console.log()
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error);
    return Promise.reject(error);
  }
);
export default service;

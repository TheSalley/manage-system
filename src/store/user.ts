import { defineStore } from "pinia";
import { ref } from "vue";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { get_user } from "@/api/user";
import { reset_router } from "@/router/index";
import { useRouter } from "vue-router";
import { generateRoutes } from "@/utils/router";
import { router } from "@/router/index";

const router_handler = useRouter();

export const use_user_store = defineStore(
  "user_store",
  () => {
    const user_info: any = ref({
      token: getToken(),
      name: "",
      avatar: "",
      status: "",
      realname: "",
      phone: "",
      email: "",
      roles: 0,
      group: "",
    });

    const permission_routes = ref([]);

    let change_user_info = (name, value) => {
      user_info.value[name] = value;
    };

    let store_user_token = (user_token) => {
      change_user_info("token", user_token);
      setToken(user_token);
    };

    let get_user_info = async () => {
      const { data }: any = await get_user();
      if (data.access && data.group_id > 0) {
        change_user_info("roles", data.group_id);
      }
      Object.keys(data).forEach(async (name) => {
        if (
          ["username", "img", "realname", "phone", "email", "group"].includes(
            name
          )
        ) {
          change_user_info(name, data[name]);
        } else if (["access"].includes(name)) {
          const res_routes = await generateRoutes(data.access);
          permission_routes.value = res_routes;
          console.log(res_routes);
          console.log(router);
          res_routes.forEach((item) => {
            router.addRoute(item);
          });
        }
      });
    };

    let logout = () => {
      ["token", "roles"].forEach((item, index) => {
        if (index == 0) {
          change_user_info(item, "");
        } else if (index == 1) {
          change_user_info(item, 0);
        }
        removeToken();
        reset_router();
        router_handler.replace("/login");
      });
    };

    return {
      user_info,
      permission_routes,
      change_user_info,
      store_user_token,
      get_user_info,
      logout,
    };
  },
  {
    persist: true,
  }
);

import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";
import { use_user_store } from "@/store/user";
import { generateRoutes } from "@/utils/router";
import { storeToRefs } from "pinia";

// 静态路由
export const constantRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/redirect",
    component: Layout,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: { title: "系统首页", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/manage/info",
    component: Layout,
    children: [
      {
        path: "/manage/info",
        component: () => import("@/views/manage/info.vue"),
        name: "manage/info",
        meta: { title: "我的资料", icon: "user" },
      },
    ],
  },
];

const routes = constantRoutes;

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

export function reset_router() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && name != "login") {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

router.beforeEach(async (to, from) => {
  console.log(to.path);
  NProgress.start();
  const hasToken = getToken();
  if (!hasToken && to.path != "/login") {
    return "/login";
  } else if (hasToken) {
    console.log('0000')
    const { user_info, permission_routes } = storeToRefs(use_user_store());
    const hasRoles = user_info.value.roles;
    console.log("这是hasRoles", hasRoles)
    console.log(router.getRoutes())
    const res: any = await generateRoutes(permission_routes.value);
    console.log("这是res", res)
    res.forEach((item) => {
      console.log(item)
      router.addRoute(item);
    });
    console.log(router.getRoutes())
    if (hasRoles) {
    } else {
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

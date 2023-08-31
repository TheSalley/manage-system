import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";
import { use_user_store } from "@/store/user";
import { generateRoutes } from "@/utils/router";

// 静态路由
export const constantRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
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
];

const routes = constantRoutes;

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, right: 0 }),
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
    const { user_info } = use_user_store();
    const hasRoles = user_info.roles;
    if (hasRoles) {
    } else {
      const res: any = await generateRoutes(user_info.access);
      res.forEach((item) => {
        router.addRoute(item);
      });
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

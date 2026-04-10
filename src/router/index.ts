import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "welcome",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/liquid-glass",
    name: "LiquidGlass",
    component: () => import("../views/LiquidGlassPage.vue"),
  },
  // 可添加其他路由
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

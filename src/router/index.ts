import { createRouter, createWebHistory, RouteRecordRaw, Router } from "vue-router";
import { auth } from "@/api/login";
import { useUserStore } from "@/store/user";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/chat.vue"),
    meta: { keepalive: false },
  },
  {
    path: "/auth/login",
    name: "login",
    component: () => import("@/views/login.vue"),
    meta: { keepalive: false },
  },
  {
    path: "/auth/register",
    name: "register",
    component: () => import("@/views/register.vue"),
    meta: { keepalive: false },
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("@/views/chat.vue"),
    meta: { keepalive: false },
  },
  {
    path: "/user/info",
    name: "info",
    component: () => import("@/views/info.vue"),
    meta: { keepalive: false, requireAuth: true },
  },
  {
    path: "/landing",
    name: "landing",
    component: () => import("@/views/landing.vue"),
    meta: { keepalive: false },
  },
];

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log("beforeEach", to.meta.requireAuth);
  if (to.meta.requireAuth) {
    const userStore = useUserStore();
    if (userStore.user) {
      try {
        await auth();
        next();
      } catch (err) {
        next({ name: "login", query: { redirect: to.fullPath } });
      }
    } else {
      next({ name: "login", query: { redirect: to.fullPath } });
    }
  } else {
    next();
  }
});

export default router;

export const createDefaultRouter: (routes: Array<RouteRecordRaw>) => Router = routes =>
  createRouter({
    history: createWebHistory(),
    routes,
  });

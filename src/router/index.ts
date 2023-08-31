import { createRouter, createWebHistory, RouteRecordRaw, Router } from "vue-router";
import axios from "@/api/request";
import { useUserStore } from "@/store/user";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/index.vue"),
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
    meta: { keepalive: false },
  },
];

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("beforeEach", to.meta.requireAuth);
  if (to.meta.requireAuth) {
    const userStore = useUserStore();
    if (userStore.user) {
      axios
        .get("/auth")
        .then(resp => {
          if (resp) next();
        })
        .catch(err => {
          next({ name: "login", query: { redirect: to.fullPath } });
        });
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

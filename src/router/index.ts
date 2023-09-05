import { useUserStore } from "@/store/user";
import { RouteRecordRaw, Router, createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { auth } from "@/api/login";

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

export const createDefaultRouter: (routes: Array<RouteRecordRaw>) => Router = (routes) =>
  createRouter({
    history: createWebHistory(),
    routes,
  });

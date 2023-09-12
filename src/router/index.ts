import { useUserStore } from "@/store/user";
import { RouteRecordRaw, Router, createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { auth } from "@/api/login";
import { AxiosError } from "axios";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log("beforeEach", from, to, to.meta);
  if (to.fullPath === "/") {
    next("chat");
    return;
  }
  if (to.meta.requireAuth || to.fullPath.startsWith("/admin")) {
    const userStore = useUserStore();
    if (userStore.user) {
      try {
        await auth(to.fullPath.startsWith("/admin"), to.meta.perm as any);
        next();
      } catch (e) {
        const err = e as AxiosError;
        if (err.response?.status == 400) {
          next({ name: "404" }); // Pretend that the page is not existent
        } else {
          next({ name: "login", query: { redirect: to.fullPath } }); // Need login
        }
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

export function redirectLogin() {
  router.push({ name: "login", query: { redirect: router.currentRoute.value.fullPath } });
}

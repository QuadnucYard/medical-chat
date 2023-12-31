import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/chat",
  },
  {
    path: "/auth",
    component: () => import("@/views/login/index.vue"),
    meta: { keepalive: false },
    children: [
      {
        path: "/auth/login",
        name: "login",
        component: () => import("@/views/login/login.vue"),
        meta: { keepalive: false },
      },
      {
        path: "/auth/register",
        name: "register",
        component: () => import("@/views/login/register.vue"),
        meta: { keepalive: false },
      },
    ],
  },
  {
    path: "/chat",
    component: () => import("@/layouts/MainLayout.vue"),
    meta: { keepalive: false, requiresAuth: true },
    children: [
      {
        path: "",
        name: "chat",
        component: () => import("@/views/chat/index.vue"),
      },
      {
        path: "/user/info",
        name: "user-info",
        component: () => import("@/views/user/index.vue"),
      },
      {
        path: "/site/info",
        name: "site-info",
        component: () => import("@/views/about/site-info.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("@/layouts/AdminLayout.vue"),
    meta: { keepalive: false, requiresAuth: true },
    children: [
      {
        path: "",
        name: "admin-index",
        component: () => import("@/views/admin/index.vue"),
      },
      {
        path: "chat",
        name: "admin-chat",
        component: () => import("@/views/admin/chat/chat.vue"),
      },
      {
        path: "message",
        name: "admin-message",
        component: () => import("@/views/admin/chat/message.vue"),
      },
      {
        path: "share",
        name: "admin-share",
        component: () => import("@/views/admin/chat/share.vue"),
      },
      {
        path: "question",
        name: "admin-question",
        component: () => import("@/views/admin/content/question.vue"),
      },
      {
        path: "recommend",
        name: "admin-recommend",
        component: () => import("@/views/admin/content/recommend.vue"),
      },
      {
        path: "user",
        name: "admin-user",
        component: () => import("@/views/admin/user/user.vue"),
      },
      {
        path: "complaint",
        name: "admin-complaint",
        component: () => import("@/views/admin/user/complaint.vue"),
      },
      {
        path: "kg",
        name: "admin-kg",
        component: () => import("@/views/admin/content/kg-view.vue"),
      },
    ],
  },
  {
    path: "/share/:id",
    name: "share",
    component: () => import("@/views/Error404.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    name: "404",
    component: () => import("@/views/Error404.vue"),
  },
];

export default routes;

import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/chat",
  },
  {
    path: "/auth",
    component: () => import("@/views/login/LoginPage.vue"),
    meta: { keepalive: false },
    children: [
      {
        path: "/auth/login",
        name: "login",
        component: () => import("@/views/login/Login.vue"),
        meta: { keepalive: false },
      },
      {
        path: "/auth/register",
        name: "register",
        component: () => import("@/views/login/Register.vue"),
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
        component: () => import("@/views/chat/ChatArea.vue"),
      },
      {
        path: "/user/info",
        name: "user-info",
        component: () => import("@/views/user/UserInfo.vue"),
      },
      {
        path: "/site/info",
        name: "site-info",
        component: () => import("@/views/about/SiteInfo.vue"),
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
        component: () => import("@/views/admin/IndexPage.vue"),
      },
      {
        path: "chat",
        name: "admin-chat",
        component: () => import("@/views/admin/chat/ChatPage.vue"),
      },
      {
        path: "message",
        name: "admin-message",
        component: () => import("@/views/admin/chat/MessagePage.vue"),
      },
      {
        path: "share",
        name: "admin-share",
        component: () => import("@/views/admin/chat/SharePage.vue"),
      },
      {
        path: "question",
        name: "admin-question",
        component: () => import("@/views/admin/content/QuestionPage.vue"),
      },
      {
        path: "recommend",
        name: "admin-recommend",
        component: () => import("@/views/admin/content/RecommendPage.vue"),
      },
      {
        path: "user",
        name: "admin-user",
        component: () => import("@/views/admin/user/UserPage.vue"),
      },
      {
        path: "complaint",
        name: "admin-complaint",
        component: () => import("@/views/admin/user/ComplaintPage.vue"),
      },
      {
        path: "kg",
        name: "admin-kg",
        component: () => import("@/views/admin/content/KGViewPage.vue"),
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

import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    component: () => import("@/layouts/MainLayout.vue"),
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
    name: "chat-main",
    component: () => import("@/layouts/MainLayout.vue"),
    meta: { keepalive: false },
    children: [
      {
        path: "",
        name: "chat",
        component: () => import("@/views/chat/ChatArea.vue"),
      },
      {
        path: "/user/info",
        name: "user-info",
        component: () => import("@/views/info.vue"),
        meta: { keepalive: false, requireAuth: true },
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("@/views/Error404.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/AdminLayout.vue"),
    meta: { keepalive: false },
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/views/admin/content/IndexPage.vue"),
      },
      {
        path: "customer",
        name: "customer",
        component: () => import("@/views/admin/content/CustomerPage.vue"),
      },
      {
        path: "business_config",
        name: "business_config",
        component: () => import("@/views/admin/content/BusinessConfigPage.vue"),
      },
      {
        path: "customer_list",
        name: "customer_list",
        component: () => import("@/views/admin/content/CustomerList.vue"),
      },
      {
        path: "order",
        name: "order",
        component: () => import("@/views/admin/content/OrderPage.vue"),
      },
      {
        path: "user",
        name: "admin-user",
        component: () => import("@/views/admin/user/User.vue"),
      },
      {
        path: "chat",
        name: "admin-chat",
        component: () => import("@/views/admin/chat/ChatList.vue"),
      },
      {
        path: "message",
        name: "admin-message",
        component: () => import("@/views/admin/chat/MessageList.vue"),
      },
    ],
  },
];

export default routes;

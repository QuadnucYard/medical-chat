import { RouteRecordRaw } from "vue-router";

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
      {
        path: "complaint",
        name: "admin-complaint",
        component: () => import("@/views/admin/chat/complaint.vue"),
      },
    ],
  },
];

export default routes;

import { defineStore } from "pinia";

export const appMenu = defineStore("menus", {
  state: () => ({
    menus: [
      {
        icon: "addchart",
        label: "数据统计",
        children: [
          { label: "业务总览", page: "index" },
          { label: "客户统计", page: "customer" },
        ],
      },
      {
        icon: "settings",
        label: "运营管理",
        children: [
          { label: "业务配置", page: "business_config" },
          { label: "客户管理", page: "customer_list" },
          { label: "订单管理", page: "order" },
        ],
      },
      {
        icon: "chat",
        label: "聊天管理",
        children: [
          { label: "会话管理", page: "admin-chat" },
          { label: "对话管理", page: "admin-message" },
        ],
      },
      {
        icon: "o_settings",
        label: "系统管理",
        children: [
          { label: "参数配置", page: "config" },
          { label: "角色管理", page: "role" },
          { label: "用户管理", page: "admin-user" },
        ],
      },
    ],
  }),
  // getters: {
  //   menus: (state) => state.menus,
  // },
  actions: {
    // increment() {
    // },
  },
});

import { defineStore } from "pinia";

export const appMenu = defineStore("menus", {
  state: () => ({
    menus: [
      {
        icon: "addchart",
        label: "数据统计",
        children: [{ label: "业务总览", page: "index" }],
      },
      {
        icon: "settings",
        label: "运营管理",
        children: [
          { label: "问答管理", page: "admin-question" },
          { label: "推荐管理", page: "admin-recommend" },
        ],
      },
      {
        icon: "chat",
        label: "聊天管理",
        children: [
          { label: "会话管理", page: "admin-chat" },
          { label: "对话管理", page: "admin-message" },
          { label: "投诉管理", page: "admin-complaint" },
          { label: "分享管理", page: "admin-share" },
        ],
      },
      {
        icon: "o_settings",
        label: "系统管理",
        children: [{ label: "用户管理", page: "admin-user" }],
      },
      {
        icon: "o_bubble_chart",
        label: "数据管理",
        children: [{ label: "知识库", page: "admin-kg" }],
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

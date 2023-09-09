import Cookies from "js-cookie";
import { User } from "@/api/user";

type UserState = { token?: string; data?: User } | null;

export const useUserStore = defineStore("user", {
  state: () => ({
    user: <UserState>{ token: Cookies.get("token") },
  }),
  actions: {
    login(data: UserState) {
      this.user = data;
      Cookies.set("token", data?.token ?? "", { expires: 1 });
    },
    logout() {
      // 注意不能用 null 清除，否则将无法判断 user 里具体的内容
      this.user = null;
      Cookies.remove("token");
    },
  },
});

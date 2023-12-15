import type { VueCookies } from "vue-cookies";
import { User, getUserMe } from "@/api/user";
import { login as loginApi } from "@/api/login";

export const useUserStore = defineStore("user", () => {
  const $cookies = inject<VueCookies>("$cookies")!;

  const user = ref<User | undefined>($cookies.get("user"));
  const token = ref<string | undefined>($cookies.get("token"));

  const avatar = computed(() =>
    user.value && user.value.avatar_url.length > 0
      ? import.meta.env.VITE_APP_BASE_API + "/" + user.value.avatar_url
      : "/img/default-user.png"
  );

  const login = async (username: string, password: string) => {
    // 获取token
    const { access_token, token_type } = await loginApi(username, password);
    token.value = `${token_type} ${access_token}`;
    $cookies.set("token", token.value);
    // 获取用户信息
    user.value = await fetch();
    $cookies.set("user", user.value);
  };
  const logout = () => {
    user.value = undefined;
    $cookies.remove("user");
    $cookies.remove("token");
  };
  const fetch = async () => {
    try {
      user.value = await getUserMe();
    } catch (e) {}
    return user.value;
  };
  const hasPerm = (name?: string) => {
    return name === undefined || user.value?.role.perms.find((t) => t.name === name) !== undefined;
  };

  return { user, token, avatar, login, logout, fetch, hasPerm };
});

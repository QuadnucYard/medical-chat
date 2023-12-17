import * as api from "@/api/login";
import { getUserMe } from "@/api/user";
import { useCookies } from "@/hooks/cookies";
import type { User } from "@/interfaces";

export const useUserStore = defineStore("user", () => {
  const $cookies = useCookies();

  const user = ref<User | undefined>($cookies.get("user"));
  const token = ref<string | undefined>($cookies.get("token"));

  const avatar = computed(() =>
    user.value && user?.value.avatar_url.length > 0
      ? import.meta.env.VITE_APP_BASE_API + "/" + user.value.avatar_url
      : "/img/default-user.png"
  );

  const register = async (username: string, password: string) => {
    return await api.register(username, password);
  };

  const login = async (username: string, password: string) => {
    // 获取token
    const { access_token, token_type } = await api.login(username, password);
    token.value = `${token_type} ${access_token}`;
    $cookies.set("token", token.value);
    // 获取用户信息
    user.value = await fetch();
    $cookies.set("user", user.value);
  };

  const logout = async () => {
    token.value = undefined;
    user.value = undefined;
    $cookies.remove("user");
    $cookies.remove("token");
    await api.logout();
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

  return { user, token, avatar, register, login, logout, fetch, hasPerm };
});

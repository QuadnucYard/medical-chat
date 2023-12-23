import * as apiL from "@/api/login";
import * as api from "@/api/user";
import { useCookies } from "@/hooks/cookies";
import type { PasswordUpdate, User, UserUpdate } from "@/interfaces";

export const useUserStore = defineStore("user", () => {
  const $cookies = useCookies();

  const user = ref<User | undefined>($cookies.get("user"));
  const token = ref<string | undefined>($cookies.get("token"));

  const avatar = computed(() =>
    user.value && user.value?.avatar_url?.length > 0
      ? import.meta.env.VITE_APP_BASE_API + "/" + user.value.avatar_url
      : "/img/default-user.png"
  );

  const register = async (username: string, password: string) => {
    return await apiL.register(username, password);
  };

  const login = async (username: string, password: string) => {
    // 获取token
    const { access_token, token_type } = await apiL.login(username, password);
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
    await apiL.logout();
  };

  const fetch = async () => {
    try {
      user.value = await api.getUserMe();
    } catch (e) {}
    return user.value;
  };

  const updateMe = async (userUpdate: UserUpdate) => {
    user.value = await api.updateUserMe(userUpdate);
    $cookies.set("user", user.value);
  };

  const updateMyAvatar = async (avatar: File) => {
    user.value = await api.updateUserMeAvatar(avatar);
  };

  const updateMyPassword = async (passwordUpdate: PasswordUpdate) => {
    await apiL.changePassword(passwordUpdate);
  };

  const hasPerm = (name?: string) => {
    return name === undefined || user.value?.role.perms.find((t) => t.name === name) !== undefined;
  };

  const isUserMe = (user_id: int) => {
    return user_id === user.value?.id;
  };

  fetch();

  return {
    user,
    token,
    avatar,
    register,
    login,
    logout,
    fetch,
    updateMe,
    updateMyAvatar,
    updateMyPassword,
    hasPerm,
    isUserMe,
  };
});

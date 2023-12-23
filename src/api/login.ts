import type { AccessToken, PasswordUpdate, User } from "@/interfaces";

import api from "./api";

export async function register(username: string, password: string) {
  return await api.postForm<User>("/auth/register", { username, password });
}

export async function login(username: string, password: string) {
  return await api.postForm<AccessToken>("/auth/login", { username, password });
}

export async function logout() {
  await api.post("/auth/logout");
}

export async function auth(admin?: boolean, perm?: string) {
  await api.post("/auth", { admin, perm });
}

export async function changePassword(passwordUpdate: PasswordUpdate) {
  await api.postForm("/auth/password-change", passwordUpdate);
}

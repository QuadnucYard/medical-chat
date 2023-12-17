import type { AccessToken, User } from "@/interfaces";

import api from "./request";

export async function register(username: string, password: string) {
  return (await api.postForm<User>("/auth/register", { username, password })).data;
}

export async function login(username: string, password: string) {
  return (await api.postForm<AccessToken>("/auth/login", { username, password })).data;
}

export async function logout() {
  await api.post("/auth/logout");
}

export async function auth(admin?: boolean, perm?: string) {
  return (await api.post("/auth", { admin, perm })).data;
}

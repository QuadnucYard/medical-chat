import type { Pagination, User, UserStats } from "@/interfaces";

import api from "./api";

export async function getUserMe() {
  return await api.get<User>("/users/me");
}

export async function updateUser(user_id: int, user_data: any) {
  return await api.put<User>(`/users/${user_id}`, user_data);
}

export async function getUsers(page: Pagination) {
  return await api.getPage<User>("/users/", page);
}

export async function updateUserMe(user_data: any) {
  return await api.putForm<User>("/users/me", user_data);
}

export async function updateUserMeAvatar(user_avatar: File) {
  return await api.postForm<User>("/users/me/avatar", { file: user_avatar });
}

export async function updateUserMePassword() {
  return await api.postForm<User>("/users/me/pwd");
}

export async function getUserStats() {
  return await api.get<UserStats>("/users/stat");
}

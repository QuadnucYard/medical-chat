import type { Page, Pagination, User, UserStats } from "@/interfaces";
import { castPagination } from "@/utils/paginating";

import api from "./request";

export async function getUserMe() {
  return (await api.get<User>("/users/me")).data;
}

export async function updateUser(user_id: int, user_data: any) {
  return (await api.put(`/users/${user_id}`, user_data)).data;
}

export async function getUsers(page: Pagination) {
  const params = castPagination(page);
  return (await api.get<Page<User>>("/users/", { params })).data;
}

export async function updateUserMe(user_data: any) {
  return (await api.putForm<User>("/users/me", user_data)).data;
}

export async function updateUserMeAvatar(user_avatar: File) {
  return (await api.postForm<User>("/users/me/avatar", { file: user_avatar })).data;
}

export async function getUserStats() {
  return (await api.get<UserStats>("/users/stat")).data;
}

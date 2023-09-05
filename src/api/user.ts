import { Page, Pagination } from "./page";
import api from "./request";

export interface User {
  id: int;
  username: string;
  email: string;
  phone: string;
  name: string;
  avatar_url: string;
  create_time: any;
  login_time: any;
  update_time: any;
  is_superuser: boolean;
  valid: boolean;
}

export type UserPartial = Pick<User, "id" | "username" | "avatar_url">;

export async function getUser() {
  return (await api.get<User>("/users/me")).data;
}

export async function updateUser(user_id: int, user_data: any) {
  return (await api.put(`/users/${user_id}`, user_data)).data;
}

export async function getUsers(page: Pagination) {
  const params = {
    page: page.page,
    size: page.rowsPerPage,
    sort_by: page.sortBy,
    desc: page.descending,
  };
  return (await api.get<Page<User>>("/users/", { params })).data;
}

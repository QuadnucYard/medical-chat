import api from "./request";

export interface AccessToken {
  access_token: string;
  token_type: string;
}

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

export async function register(username: string, password: string): Promise<any> {
  return (await api.postForm("/auth/register", { username, password })).data;
}

export async function login(username: string, password: string): Promise<AccessToken> {
  return (await api.postForm("/auth/login", { username, password })).data;
}

export async function getUser(): Promise<User> {
  return (await api.get("/users/me")).data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

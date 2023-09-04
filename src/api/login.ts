import api from "./request";

export interface AccessToken {
  access_token: string;
  token_type: string;
}

export async function register(username: string, password: string): Promise<any> {
  return (await api.postForm("/auth/register", { username, password })).data;
}

export async function login(username: string, password: string): Promise<AccessToken> {
  return (await api.postForm("/auth/login", { username, password })).data;
}


export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}


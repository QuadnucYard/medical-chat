import axios from "./request";

export async function visit(
  username: string
): Promise<{ access_token: string; token_type: string; encrypt_salt: string }> {
  return (await axios.postForm("/auth/visit", { username })).data;
}

export async function login(username: string, password: string): Promise<any> {
  await new Promise(resolve => setTimeout(resolve,1000));

  const response = {
      status:"success",
      message:"登录成功",
      data:{username}
  }
  return response
}

export async function getUser(): Promise<any> {
  return (await axios.get("/user/me")).data;
}

export async function logout(): Promise<void> {
  await axios.post("/auth/logout");
}

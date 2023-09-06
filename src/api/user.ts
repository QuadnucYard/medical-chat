import api from "./request";

export interface User {
    username: string;
    email: string;
    phone: string;
    name: string;
    avatar_url: string;
    create_time: any;
    login_time: any;
    update_time: any;
    is_superuser: boolean;
    role_id:int;
    valid: boolean;
    id:int;
  }

  export type UserPartial = Pick<User, "id" | "username" | "avatar_url">;


  export async function getUser(): Promise<User> {
    return (await api.get("/users/me")).data;
  }

  export async function updateUser(user_data: any): Promise<User>  {
    return (await api.put(`/users/`, user_data)).data
  }
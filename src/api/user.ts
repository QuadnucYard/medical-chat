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


  export async function getUser(): Promise<User> {
    return (await api.get("/users/me")).data;
  }

  export async function updateUser(user_id: int, user_data: any) {
    return (await api.put(`/api/user/${user_id}`, user_data)).data
  }
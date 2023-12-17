import { Role } from ".";

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
  role: Role;
}

export type UserPartial = Pick<User, "id" | "username" | "avatar_url">;

export type UserStats = {
  total: int;
  register_today: int;
  login_today: int;
  active_today: int;
};

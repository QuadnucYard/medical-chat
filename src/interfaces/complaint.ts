import { UserPartial } from "./user";

export interface Complaint {
  category: string;
  content: string;
  create_time: string;
  resolve_time?: string;
  id: int;
  user_id: int;
  admin_id?: int;
  user: UserPartial;
  admin?: UserPartial;
  reply?: string;
}

export type ComplaintStats = {
  total: int;
  total_today: int;
  resolved: int;
  resolved_today: int;
  by_date: { date: string; creation: int; resolution: int }[];
};

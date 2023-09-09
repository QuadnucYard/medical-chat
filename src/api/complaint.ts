import { Page, Pagination, castPagination } from "./page";
import api from "./request";
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

export async function postComplaint(complaint_detail: any) {
  return (await api.postForm<Complaint>("/complaints/", complaint_detail)).data;
}

export async function getAllComplaints(page: Pagination, resolved: boolean | null) {
  const params = castPagination(page);
  return (await api.get<Page<Complaint>>("/complaints/", { params: { ...params, resolved } })).data;
}

export async function resolveComplaint(id: int, reply: string) {
  return (await api.post<Complaint>(`/complaints/${id}`, { reply })).data;
}

export async function getComplaintStats() {
  return (await api.get<ComplaintStats>("/complaints/stat")).data;
}

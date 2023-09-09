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

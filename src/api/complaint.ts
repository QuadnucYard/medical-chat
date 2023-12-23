import type { Complaint, ComplaintCreate, ComplaintStats, Pagination } from "@/interfaces";

import api from "./api";

export async function postComplaint(complaintCreate: ComplaintCreate) {
  return await api.post<Complaint>("/complaints/", complaintCreate);
}

export async function getAllComplaints(page: Pagination, resolved: boolean | null) {
  return await api.getPage<Complaint>("/complaints/", page, { resolved });
}

export async function resolveComplaint(id: int, reply: string) {
  return await api.post<Complaint>(`/complaints/${id}`, { reply });
}

export async function getComplaintStats() {
  return await api.get<ComplaintStats>("/complaints/stat");
}

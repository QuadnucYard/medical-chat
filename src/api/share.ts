import type { Pagination, SharedLink, SharedLinkCreate } from "@/interfaces";

import api from "./api";

export async function createShare(payload: SharedLinkCreate) {
  return await api.post<SharedLink>("/share/", payload);
}

export async function deleteShare(id: string) {
  return await api.delete<SharedLink>(`/share/${id}`);
}

export async function accessShare(id: string) {
  return await api.get<SharedLink>(`/share/${id}`);
}

export async function updateShare(id: string, payload: { max_uses?: int; readonly?: boolean; valid?: boolean }) {
  return await api.put<SharedLink>(`/share/${id}`, payload);
}

export async function getAllShares(page: Pagination) {
  return await api.getPage<SharedLink>(`/share/`, page);
}

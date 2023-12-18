import type { Pagination, Recommendation, RecommendationMore } from "@/interfaces";

import api from "./api";

export async function getRecommendations() {
  return await api.get<Recommendation[]>("/recommends/");
}

export async function getAllRecommendations(page: Pagination, active?: boolean) {
  return await api.getPage<RecommendationMore>("/recommends/all", page, { active });
}

export async function createRecommendation(title: string, content: string) {
  return await api.post<RecommendationMore>("/recommends/", { title, content });
}

export async function removeRecommendation(id: int) {
  return await api.delete<RecommendationMore>(`/recommends/${id}`);
}

export async function recoverRecommendation(id: int) {
  return await api.put<RecommendationMore>(`/recommends/${id}`);
}

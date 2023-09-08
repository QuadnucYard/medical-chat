import api from "./request";

export interface Recommendation {
  title: string;
  content: string;
  add_time: string;
}

export async function getRecommendations() {
  return (await api.get<Recommendation[]>("/recommends/")).data;
}

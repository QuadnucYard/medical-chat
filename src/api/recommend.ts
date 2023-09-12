import api from "./request";

export interface Recommendation {
  id: int;
  title: string;
  content: string;
  add_time: string;
}

export async function getRecommendations() {
  return (await api.get<Recommendation[]>("/recommends/")).data;
}

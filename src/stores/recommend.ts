import * as api from "@/api/recommend";
import { Recommendation } from "@/interfaces";

export const useRecommendStore = defineStore("chat", () => {
  const recommends = ref<Recommendation[]>([]);

  const fetchAll = async () => {
    recommends.value = await api.getRecommendations();
    return recommends.value;
  };

  return { recommends, fetchAll };
});

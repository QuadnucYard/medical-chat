import type { QuestionStats } from "@/interfaces";

import api from "./api";

export async function getQuestionStats() {
  return await api.get<QuestionStats>("/questions/stat");
}

import type { QuestionStats } from "@/interfaces";

import api from "./request";

export async function getQuestionStats() {
  return (await api.get<QuestionStats>("/questions/stat")).data;
}

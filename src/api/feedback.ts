import type { FeedbackStats } from "@/interfaces";

import api from "./request";

export async function getFeedbackStats() {
  return (await api.get<FeedbackStats>("/feedbacks/stat")).data;
}

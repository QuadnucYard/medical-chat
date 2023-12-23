import type { ChatFeedback, ChatFeedbackDetailed, ChatFeedbackUpdate, FeedbackStats, Pagination } from "@/interfaces";

import api from "./api";

export async function addFeedback(feedback_data: ChatFeedbackUpdate) {
  return await api.put<ChatFeedback>("/feedbacks/", feedback_data);
}

export async function getAllFeedbacks(page: Pagination) {
  return await api.getPage<ChatFeedbackDetailed>("/feedbacks/", page);
}

export async function getFeedbackStats() {
  return await api.get<FeedbackStats>("/feedbacks/stat");
}

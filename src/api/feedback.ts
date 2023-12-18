import type {
  ChatFeedback,
  ChatFeedbackDetailed,
  ChatFeedbackUpdate,
  FeedbackStats,
  Page,
  Pagination,
} from "@/interfaces";
import { castPagination } from "@/utils/paginating";

import api from "./request";

export async function addFeedback(feedback_data: ChatFeedbackUpdate) {
  return (await api.put<ChatFeedback>("/feedbacks/", feedback_data)).data;
}

export async function getAllFeedbacks(page: Pagination) {
  const params = castPagination(page);
  return (await api.get<Page<ChatFeedbackDetailed>>("/feedbacks/", { params })).data;
}

export async function getFeedbackStats() {
  return (await api.get<FeedbackStats>("/feedbacks/stat")).data;
}

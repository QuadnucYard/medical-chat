import api from "./request";

export type FeedbackStats = {
  total: int;
  total_today: int;
  total_like_today: int;
  total_dislike_today: int;
  total_yesterday: int;
  total_like_yesterday: int;
  total_dislike_yesterday: int;
  by_date: { date: string; total: int; like: int; dislike: int; comments: int }[];
};

export async function getFeedbackStats() {
  return (await api.get<FeedbackStats>("/feedbacks/stat")).data;
}

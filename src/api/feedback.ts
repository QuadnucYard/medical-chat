import api from "./request";

export interface Feedback {
    msg_id: int;
    user_id: int;
    mark_like: boolean;
    mark_dislike: boolean;
    content: string;
}

export async function addFeedback(feedback_data: any): Promise<Feedback> {
    return (await api.post("/feedbacks/",feedback_data)).data;
  }
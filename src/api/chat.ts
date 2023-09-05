import api from "./request";

export interface ChatSession {
  user_id:int;
  id: int;
  title: string;
  delete_time:string;
  create_time: string;
  update_time: string;
  messages?: {
    chat_id:int;
    type:int;
    content: string;
    id:int;
    send_time: string;
  }[];
}

// done
export async function getSessions(): Promise<ChatSession[]> {
  return (await api.get("/chat/me")).data;
}

export async function deleteSessions(chat_id: int) {
  return (await api.delete(`/chat/${chat_id}`)).data
}

// done
export async function addSessions(title: string): Promise<ChatSession> {
  return (await api.post("/chat/",{title})).data;
}

// done
export async function getSessionDetails(chat_id: int): Promise<ChatSession> {
  return (await api.get(`/chat/${chat_id}`)).data;
}

// done
export async function addQuestion(chat_id: int,question_data: any): Promise<ChatSession> {
  return (await api.post(`/chat/${chat_id}`,question_data)).data;
}

export async function addFeedback(feedback_data: any): Promise<ChatSession> {
  return (await api.post("/chat/feedbacks/",feedback_data)).data;
}
import api from "./request";
import { UserPartial } from "./user";
import { Page } from "./page";

export interface ChatMessage {
  chat_id: int;
  type: int;
  content: string;
  id: int;
  send_time: string;
}

export interface ChatSession {
  user_id: int;
  id: int;
  title: string;
  delete_time: string;
  create_time: string;
  update_time: string;
  messages?: ChatMessage[];
  user: UserPartial;
}

export interface ChatFeedback {
  msg_id: int;
  user_id: int;
  mark_like: boolean;
  mark_dislike: boolean;
  content: string;
  update_time: string;
}

export interface ChatFeedbackDetailed extends ChatFeedback {
  msg: ChatMessage;
  user: UserPartial;
}

// done
export async function getSessions() {
  return (await api.get<ChatSession[]>("/chat/me")).data;
}

export async function deleteSessions(chat_id: int) {
  return (await api.delete(`/chat/${chat_id}`)).data;
}

// done
export async function addSessions(title: string) {
  return (await api.post<ChatSession>("/chat/", { title })).data;
}

// done
export async function getSessionDetails(chat_id: int) {
  return (await api.get<ChatSession>(`/chat/${chat_id}`)).data;
}

// done
export async function addQuestion(chat_id: int, question_data: any) {
  return (await api.post<ChatSession>(`/chat/${chat_id}`, question_data)).data;
}

export async function addFeedback(feedback_data: any) {
  return (await api.post<ChatSession>("/chat/feedbacks/", feedback_data)).data;
}

export async function getAllSessions() {
  return (await api.get<Page<ChatSession>>("/chat/")).data;
}

export async function getAllFeedbacks() {
  return (await api.get<Page<ChatFeedbackDetailed>>("/feedbacks/")).data;
}

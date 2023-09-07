import api from "./request";
import { UserPartial } from "./user";
import { Page, Pagination, castPagination } from "./page";

export interface ChatMessage {
  chat_id: int;
  type: int;
  content: string;
  id: int;
  send_time: string;
  own_feedback?: ChatFeedback;
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

export interface ChatFeedbackUpdate {
  msg_id: int;
  mark_like?: boolean;
  mark_dislike?: boolean;
  content?: string;
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

export async function deleteSession(chat_id: int) {
  return (await api.delete(`/chat/${chat_id}`)).data;
}

// done
export async function addSession(title: string) {
  return (await api.post<ChatSession>("/chat/", { title })).data;
}

// done
export async function getSessionDetails(chat_id: int) {
  return (await api.get<ChatSession>(`/chat/${chat_id}`)).data;
}

// done
export async function addQuestion(chat_id: int, question_data: any) {
  return (await api.post<ChatMessage>(`/chat/${chat_id}`, question_data)).data;
}

export async function getAllSessions(page: Pagination) {
  const params = castPagination(page);
  return (await api.get<Page<ChatSession>>("/chat/", { params })).data;
}

export async function addFeedback(feedback_data: ChatFeedbackUpdate) {
  return (await api.put<ChatFeedback>("/feedbacks/", feedback_data)).data;
}

export async function getAllFeedbacks(page: Pagination) {
  const params = castPagination(page);
  return (await api.get<Page<ChatFeedbackDetailed>>("/feedbacks/", { params })).data;
}

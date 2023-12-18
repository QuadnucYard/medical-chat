import type { ChatMessage, ChatQuestion, ChatSession, ChatStats, NoteCreate, Page, Pagination } from "@/interfaces";
import { castPagination } from "@/utils/paginating";

import api from "./request";

export async function getMySessions() {
  return (await api.get<ChatSession[]>("/chat/me")).data;
}

export async function deleteSession(chat_id: int) {
  return (await api.delete(`/chat/${chat_id}`)).data;
}

export async function addSession(title: string) {
  return (await api.post<ChatSession>("/chat/", { title })).data;
}

export async function getSessionDetails(chat_id: int) {
  return (await api.get<ChatSession>(`/chat/${chat_id}`)).data;
}

export async function sendQuestion(chat_id: int, question_data: ChatQuestion) {
  return (await api.post<ChatMessage[]>(`/chat/${chat_id}`, question_data)).data;
}

export async function getAllSessions(page: Pagination) {
  const params = castPagination(page);
  return (await api.get<Page<ChatSession>>("/chat/", { params })).data;
}

export async function updateTitle(chat_id: int, new_title: string) {
  return (await api.put<ChatSession>(`/chat/${chat_id}`, { title: new_title })).data;
}

export async function addNote(chat_id: int, note: NoteCreate) {
  return (await api.post<ChatMessage>(`/chat/${chat_id}/note`, note)).data;
}

export async function getChatStats() {
  return (await api.get<ChatStats>("/chat/stat")).data;
}

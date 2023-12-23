import type { ChatMessage, ChatQuestion, ChatSession, ChatStats, NoteCreate, Pagination } from "@/interfaces";

import api from "./api";

export async function getMySessions() {
  return await api.get<ChatSession[]>("/chat/me");
}

export async function deleteSession(chat_id: int) {
  return await api.delete<ChatSession>(`/chat/${chat_id}`);
}

export async function addSession(title: string) {
  return await api.post<ChatSession>("/chat/", { title });
}

export async function getSessionDetails(chat_id: int) {
  return await api.get<ChatSession>(`/chat/${chat_id}`);
}

export async function sendQuestion(chat_id: int, question_data: ChatQuestion) {
  return await api.post<ChatMessage[]>(`/chat/${chat_id}`, question_data);
}

export async function getAllSessions(page: Pagination) {
  return await api.getPage<ChatSession>("/chat/", page);
}

export async function updateTitle(chat_id: int, new_title: string) {
  return await api.put<ChatSession>(`/chat/${chat_id}`, { title: new_title });
}

export async function addNote(chat_id: int, note: NoteCreate) {
  return await api.post<ChatMessage>(`/chat/${chat_id}/note`, note);
}

export async function getChatStats() {
  return await api.get<ChatStats>("/chat/stat");
}

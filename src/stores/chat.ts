import * as api from "@/api/chat";
import * as apiF from "@/api/feedback";
import type { ChatFeedback, ChatMessage, ChatQuestion, ChatSession, NoteCreate } from "@/interfaces";

export const useChatStore = defineStore("chat", () => {
  const sessions = ref<ChatSession[]>([]);

  const fetchAll = async () => {
    sessions.value = await api.getMySessions();
    return sessions.value;
  };

  const addSession = async (title: string = "") => {
    const session = await api.addSession(title);
    // await fetchAll();
    sessions.value.unshift(session);
    return session;
  };

  const deleteSession = async (chatId: int) => {
    await deleteSession(chatId);
    await fetchAll();
  };

  const updateTitle = async (chat: ChatSession, title: string) => {
    const updated = await api.updateTitle(chat.id, title);
    Object.assign(chat, updated);
  };

  const sendQuestion = async (chat: ChatSession, question_data: ChatQuestion) => {
    return await api.sendQuestion(chat.id, question_data);
    // Maybe need to update.
  };

  const addNote = async (chat: ChatSession, note: NoteCreate) => {
    return await api.addNote(chat.id, note);
  };

  const sendFeedback = async (msg: ChatMessage, mod: Partial<ChatFeedback>) => {
    const response = await apiF.addFeedback(Object.assign({}, mod, { msg_id: msg.id }));
    msg.own_feedback = response;
  };

  const sendFeedbackLike = async (msg: ChatMessage) => {
    const mark = !msg.own_feedback?.mark_like;
    await sendFeedback(msg, { mark_like: mark });
  };

  const sendFeedbackDislike = async (msg: ChatMessage) => {
    const mark = !msg.own_feedback?.mark_dislike;
    await sendFeedback(msg, { mark_dislike: mark });
  };

  return {
    sessions,
    fetchAll,
    addSession,
    deleteSession,
    updateTitle,
    sendQuestion,
    addNote,
    sendFeedback,
    sendFeedbackLike,
    sendFeedbackDislike,
  };
});

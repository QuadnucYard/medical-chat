import api from "./request";

export interface ChatSession {
  id: int;
  title: string;
  subject: string;
  createTime: string;
  updateTime: string;
  unread: boolean;
  messages?: {
    text: string;
    time: string;
  }[];
}

export async function getSessions(): Promise<ChatSession[]> {
  return (await api.get("/chat/me")).data;
}

export async function deleteSessions(chat_id: int) {
  return (await api.delete(`/chat/${chat_id}`)).data
}
export async function addSessions(title: string): Promise<ChatSession> {
  return (await api.post("/chat/",{title})).data;
}

export async function getSessionDetails(id: int): Promise<ChatSession> {
  return {
    id,
    title: `会话${id}`,
    subject: "关于主题1的讨论",
    createTime: "2023-08-01",
    updateTime: "2023-08-15",
    unread: true,
    messages: [
      { text: "你好！", time: "08:00 AM" },
      { text: "有什么问题需要帮助吗？", time: "08:05 AM" },
    ],
  };
}

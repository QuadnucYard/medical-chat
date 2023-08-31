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
  return [
    {
      id: 1,
      title: "会话1",
      subject: "关于主题1的讨论",
      createTime: "2023-08-01",
      updateTime: "2023-08-15",
      unread: true,
    },
    {
      id: 2,
      title: "会话2",
      subject: "关于主题2的讨论",
      createTime: "2023-08-05",
      updateTime: "2023-08-20",
      unread: false,
    },
    {
      id: 3,
      title: "会话3",
      subject: "关于主题3的讨论",
      createTime: "2023-08-10",
      updateTime: "2023-08-25",
      unread: true,
      messages: [],
    },
  ];
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

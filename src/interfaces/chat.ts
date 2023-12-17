import { MessageType } from "@/enums";

import { SharedLink } from "./share";
import { UserPartial } from "./user";

export interface ChatMessage {
  chat_id: int;
  type: MessageType;
  content: string;
  remark: string;
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
  link?: SharedLink;
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

export type ChatStats = {
  total_chats: int;
  total_messages: int;
  total_chats_today: int;
  total_messages_today: int;
  total_chats_yesterday: int;
  total_messages_yesterday: int;
  by_date: { date: string; total_chats: int; total_messages: int; questions: int; answers: int; notes: int }[];
};

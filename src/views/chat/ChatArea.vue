<template>
  <div v-if="session" class="chat-area">
    <q-input
      outlined
      v-model="session.title"
      label-slot
      clearable
      class="title"
      input-class="input-large"
    >
      <template v-slot:prepend>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
        </q-avatar>
      </template>
      <template v-slot:label>
        <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">标题</span>
      </template>
    </q-input>
    <q-chip outline color="primary" text-color="white" icon="event">
      创建时间：{{ formatDate(session.create_time) }}
    </q-chip>
    <q-chip outline color="primary" text-color="white" icon="event">
      更新时间：{{ formatDate(session.update_time) }}
    </q-chip>
    <div class="chat-messages">
      <my-chat-message v-for="msg in session.messages" :message="msg" />
    </div>

    <div class="input-field" style="margin-top: 10px">
      <q-input
        color="lime-11"
        bg-color="green"
        v-model="question_message.question"
        rounded
        filled
        dense
        placeholder="在此输入消息..."
        @keyup.enter="sendMessage"
      />
      <q-icon name="send" class="icon2" @click="sendMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSessionDetails, ChatSession, addQuestion, ChatMessage, ChatFeedback } from "@/api/chat";
import { formatDate } from "@/utils/date-utils";
import emitter from "@/utils/bus";
import MyChatMessage from "@/components/chat/MyChatMessage.vue";

const sessionId = ref<int | undefined>(undefined);
const session = ref<ChatSession | undefined>(undefined);

const question_message = reactive({
  question: "",
  hint: "",
});

emitter.on("session-changed", onSessionChanged);

async function onSessionChanged(newValue: int) {
  sessionId.value = newValue;
  session.value = await getSessionDetails(newValue);
}

async function sendMessage() {
  if (sessionId.value && question_message.question.trim() !== "") {
    try {
      const response = await addQuestion(sessionId.value, {
        question: question_message.question,
        hint: "",
      });
      const newQuestion = {
        chat_id: 0, // 设置聊天会话的ID
        type: 0, // 设置问题类型
        content: question_message.question, // 设置问题内容
        id: 0, // 设置问题的ID
        send_time: new Date().toISOString(), // 设置发送时间为当前时间
      };
      session.value?.messages?.push(newQuestion);
      session.value?.messages?.push(response);
      question_message.question = "";
      question_message.hint = "";
    } catch (error) {
      console.error("Failed to add question:", error);
    }
  }
}
</script>

<style scoped lang="scss">
.chat-area {
  padding: 48px;
}

.input-field {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 75%;
}
.icon2 {
  position: absolute;
  top: 50%;
  right: 20px; /* 调整图标与输入框之间的水平间距 */
  transform: translateY(-50%);
  cursor: pointer;
}
.title {
  font-size: 20px; /* 根据需要调整整体大小和样式 */
}

.input-large {
  font-size: 24px; /* 根据需要调整输入框字体大小 */
  width: 400px; /* 根据需要调整输入框宽度 */
}
</style>

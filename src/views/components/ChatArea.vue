<template>
  <div v-if="session">
    <h1 class="text-h4">{{ session.title }}</h1>
    <p>创建时间: {{ session.create_time }}</p>
    <p>更新时间: {{ session.update_time }}</p>
    <div class="chat-messages">
      <div v-for="(message, index) in session.messages" :key="index">
        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          :stamp="message.send_time"
          class="message-container"
        >
          <div class="icon-wrapper">
            <q-icon name="thumb_up" class="icon thumb-up" />
            <q-icon name="thumb_down" class="icon thumb-down" />
            <q-icon name="textsms" class="icon textsms" />
          </div>
          <div>{{ message.content }}</div>
        </q-chat-message>
      </div>
    </div>

    <div class="input-field" style="margin-top: 10px">
      <q-input
        v-model="message.question"
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
import {
  getSessionDetails,
  ChatSession,
  deleteSessions,
  getSessions,
  addQuestion,
} from "@/api/chat";
import { reactive } from "vue";

const props = defineProps<{ sessionId: int }>();

const session = ref<ChatSession | undefined>(undefined);

const message = reactive({
  question: "",
  hint: "",
});

onMounted(updateSession);
watch(props, updateSession);

async function updateSession() {
  session.value = await getSessionDetails(props.sessionId);
}

async function sendMessage() {
  if (message.question.trim() !== "") {
    try {
      const response = await addQuestion(props.sessionId, {
        question: message.question,
        hint: "",
      });
      const newQuestion = {
        chat_id: 0, // 设置聊天会话的ID
        type: 0, // 设置问题类型
        content: message.question, // 设置问题内容
        id: 0, // 设置问题的ID
        send_time: new Date().toISOString(), // 设置发送时间为当前时间
      };
      session.value?.messages?.push(newQuestion);
      session.value?.messages?.push(response);
      message.question = "";
      message.hint = "";
    } catch (error) {
      console.error("Failed to add question:", error);
    }
  }
}
</script>

<style scoped lang="scss">
.message-container {
  position: relative;
}

.icon-wrapper {
  position: absolute;
  top: 50%;
  right: -75px; /* 调整图标与消息之间的水平间距 */
  transform: translateY(-50%);
  opacity: 0; /* 初始时将图标隐藏 */
  transition: opacity 0.3s ease; /* 添加平滑过渡效果 */
  display: flex; /* 将图标容器设置为弹性布局 */
  align-items: center; /* 垂直居中对齐图标 */
}
.message-container:hover .icon-wrapper {
  opacity: 1; /* 鼠标悬停时显示图标 */
}
.icon-wrapper > .icon {
  margin-right: 10px; /* 调整thumb-up图标与thumb-down图标之间的间距 */
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
</style>

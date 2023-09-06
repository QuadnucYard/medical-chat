<template>
  <div v-if="session">
    <h1 class="text-h4">{{ session.title }}</h1>
    <p>创建时间: {{ session.create_time }}</p>
    <p>更新时间: {{ session.update_time }}</p>
    <div class="chat-messages">
      <div v-for="(message, index) in session.messages" :key="index">
        <q-chat-message
          :name="getMessageName(message)"
          :avatar="MyAvatar"
          :stamp="message.send_time"
          :sent="message.type === 0"
          class="message-container"
        >
          <div>
            <div class="icon-wrapper">
              <q-icon
                v-if="message.type === 1"
                name="thumb_up"
                :class="{ 'icon thumb-up': true }"
                @click="like(message)"
              />
              <q-icon
                v-if="message.type === 1"
                name="thumb_down"
                :class="{ 'icon thumb-down': true }"
                @click="dislike(message)"
              />
              <q-icon v-if="message.type === 1" name="textsms" class="icon textsms" />
            </div>
            {{ message.content }}
          </div>
        </q-chat-message>
      </div>
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
import { ref } from "vue";
import MyAvatar from "@/assets/knight.png";
import { getSessionDetails, ChatSession, addQuestion } from "@/api/chat";
import { addFeedback } from "@/api/feedback";
const props = defineProps<{ sessionId: int }>();

const session = ref<ChatSession | undefined>(undefined);

const question_message = reactive({
  question: "",
  hint: "",
});

onMounted(updateSession);
watch(props, updateSession);

async function updateSession() {
  session.value = await getSessionDetails(props.sessionId);
}

async function sendMessage() {
  if (question_message.question.trim() !== "") {
    try {
      const response = await addQuestion(props.sessionId, {
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
async function like(data: any) {
  try {
    const feedback = {
      msg_id: data.id,
      mark_like: true,
      mark_dislike: false,
      content: "123",
    };
    const response = await addFeedback(feedback);
  } catch (error) {
    console.error("Failed to add feedback:", error);
  }
}
async function dislike(data: any) {
  try {
    const response = await addFeedback({
      msg_id: data.id,
      mark_like: false,
      mark_dislike: true,
      content: "",
    });
  } catch (error) {
    console.error("Failed to add feedback:", error);
  }
}
function getMessageName(message: any): string {
  return message.type === 1 ? "MedBot" : "Me";
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

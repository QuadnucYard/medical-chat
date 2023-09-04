<template>
  <div v-if="session">
    <h1 class="text-h4">{{ session.title }}</h1>
    <p>创建时间: {{ session.createTime }}</p>
    <p>更新时间: {{ session.updateTime }}</p>

    <div class="chat-messages">
      <div v-for="(message, index) in session.messages" :key="index">
        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          :text="[message.text]"
          :stamp="message.time"
          class="message-container"
        >
          <div class="icon-wrapper">
            <q-icon name="thumb_up" class="icon thumb-up" />
            <q-icon name="thumb_down" class="icon thumb-down" />
            <q-icon name="textsms" class="icon textsms" />
          </div>
        </q-chat-message>
      </div>
    </div>

    <div class="input-field" style="margin-top: 10px">
      <q-input
        v-model="message"
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
  addSessions,
} from "@/api/chat";
const props = defineProps<{ sessionId: int }>();

const session = ref<ChatSession | undefined>(undefined);

const message = ref("");

onMounted(updateSession);
watch(props, updateSession);

async function updateSession() {
  session.value = await getSessionDetails(props.sessionId);
}

function sendMessage() {
  if (message.value.trim() !== "") {
    const newMessage = {
      text: message.value.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    session.value?.messages?.push(newMessage);
    message.value = "";
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

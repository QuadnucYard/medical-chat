<template>
  <div v-if="session">
    <h1 class="text-h4">{{ session.title }}</h1>
    <p>创建时间: {{ session.createTime }}</p>
    <p>更新时间: {{ session.updateTime }}</p>

    <div class="chat-container" style="flex: 1; overflow-y: auto">
      <div class="chat-messages">
        <div v-for="(message, index) in session.messages" :key="index">
          <!-- <p>{{ message.text }}</p>
          <p class="message-time">{{ message.time }}</p> -->
          <q-chat-message
            name="Jane"
            avatar="https://cdn.quasar.dev/img/avatar3.jpg"
            :text="[message.text]"
            :stamp="message.time"
          />
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatSession, getSessionDetails } from "@/api/chat";

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

<style scoped lang="scss"></style>

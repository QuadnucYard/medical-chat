<template>
  <div class="relative">
    <q-input
      v-model="inputMessage.question"
      rounded
      filled
      dense
      placeholder="在此输入消息..."
      @keyup.enter="sendMessage"
      class="fixed bottom-0 w-1/2"
    >
      <template v-slot:append>
        <q-btn round dense flat icon="send" @click="sendMessage" />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { ChatMessage, ChatSession, sendQuestion } from "@/api/chat";

const props = defineProps<{ session: ChatSession }>();

const emit = defineEmits<{ "message-sent": [ChatMessage[]] }>();

const inputMessage = reactive({
  question: "",
  hint: "",
});

async function sendMessage() {
  console.log("send");
  if (inputMessage.question.trim() === "") return;
  const response = await sendQuestion(props.session.id, {
    question: inputMessage.question.trim(),
    hint: "",
  });
  inputMessage.question = "";
  inputMessage.hint = "";
  emit("message-sent", response);
}

function manualSend(question: string) {
  inputMessage.question = question;
  sendMessage();
}

defineExpose({ manualSend });
</script>

<style scoped></style>

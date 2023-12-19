<template>
  <div class="relative">
    <q-input
      v-model="inputMessage.question"
      rounded
      filled
      dense
      placeholder="在此输入消息..."
      @keyup.enter="sendMessage"
      class="fixed bottom-0"
      bg-color="grey-4"
      style="width: calc(100% - 700px)"
    >
      <template v-slot:append>
        <q-btn round dense flat icon="send" @click="sendMessage" />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage, ChatSession } from "@/interfaces";
import { useChatStore } from "@/stores/chat";

const props = defineProps<{ session: ChatSession }>();

const chatStore = useChatStore();

const emit = defineEmits<{ "message-sent": [ChatMessage[]] }>();

const inputMessage = reactive({
  question: "",
  hint: "",
});

async function sendMessage() {
  if (inputMessage.question.trim() === "") return;
  const response = await chatStore.sendQuestion(props.session, {
    question: inputMessage.question.trim(),
    hint: "",
  });
  inputMessage.question = "";
  inputMessage.hint = "";
  emit("message-sent", response);
}

function manualSend(question: string) {
  inputMessage.question = question;
  // sendMessage();
}

defineExpose({ manualSend });
</script>

<style scoped></style>

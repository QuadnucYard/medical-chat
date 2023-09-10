<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-9">
        <div v-if="session" class="q-pa-lg">
          <chat-header :session="session" />

          <div ref="dialogContainerRef" class="q-pa-md">
            <my-chat-message v-for="msg in session.messages" :message="msg" />
          </div>
          <chat-input ref="inputRef" :session="session" @message-sent="sendMessage" />

          <div class="relative">
            <q-fab
              v-model="fabLeft"
              vertical-actions-align="left"
              color="primary"
              glossy
              icon="keyboard_arrow_up"
              direction="up"
              class="fixed bottom-1 right-32"
            >
              <q-fab-action label-position="right" color="accent" icon="report" label="投诉" @click="report = true" />
              <q-fab-action label-position="right" color="primary" icon="note" label="笔记" @click="note = true" />
              <q-fab-action
                label-position="right"
                color="primary"
                icon="note"
                label="显示当前会话笔记"
                @click="allnote = true"
              />
            </q-fab>
            <chat-note-list :notes="notes" />
            <complain-dialog />
            <chat-note-dialog :session="session" />
          </div>
        </div>
      </div>

      <div class="col-3">
        <recommend-list @send="sendRecommend" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatMessage, ChatSession, MessageType, getSessionDetails } from "@/api/chat";
import MyChatMessage from "@/components/chat/MyChatMessage.vue";
import emitter from "@/utils/bus";

const sessionId = ref<int | undefined>(undefined);
const session = ref<ChatSession | undefined>(undefined);

const inputRef = ref<InstanceType<typeof ChatInput>>();

const fabLeft = ref(true);

const allnote = ref(false);
const note = ref(false);
const dialogContainerRef = ref();

const notes = computed(() => session.value?.messages?.filter((m) => m.type == MessageType.Note));

emitter.on("session-changed", onSessionChanged);

async function onSessionChanged(newValue: int) {
  sessionId.value = newValue;
  session.value = await getSessionDetails(newValue);
}

function sendMessage(messages: ChatMessage[]) {
  session.value?.messages?.push(...messages);
  nextTick(() => {
    dialogContainerRef.value.scrollTop = dialogContainerRef.value.scrollHeight;
  });
}

async function sendRecommend(title: string) {
  inputRef.value.manualSend(title);
}
</script>

<style scoped lang="scss"></style>

<template>
  <div>
    <q-input
      bottom-slots
      v-model="session.title"
      counter:dense="dense"
      class="title"
      input-class="input-large"
      @blur="update_title(session.id, session.title)"
      style="font-size: 28px"
    >
      <template v-slot:hint> 编辑文本以更改标题 </template>
      <template v-slot:append>
      </template>
    </q-input>

    <div class="row">
      <q-chip outline color="primary" text-color="white" icon="event">
        创建时间：{{ formatDate(session.create_time) }}
      </q-chip>
      <q-chip outline color="primary" text-color="white" icon="event">
        更新时间：{{ formatDate(session.update_time) }}
      </q-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatSession, MessageType, addNote, sendQuestion, getSessionDetails, updateTitle } from "@/api/chat";
import { postComplaint } from "@/api/complaint";
import { Recommendation, getRecommendations } from "@/api/recommend";
import { createShare } from "@/api/share";
import MyChatMessage from "@/components/chat/MyChatMessage.vue";
import emitter from "@/utils/bus";
import { formatDate, formatDateToDay } from "@/utils/date-utils";
import Message from "@/utils/message";

const props = defineProps<{ session: ChatSession }>();

async function update_title(chat_id: int, title: string) {
  if (title !== "") {
    emitter.emit("session-title-changed", { id: chat_id, title });
    const response = await updateTitle(chat_id, title);
    Object.assign(props.session, response);
  }
}
</script>

<style scoped></style>

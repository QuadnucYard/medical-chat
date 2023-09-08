<template>
  <div v-if="session" class="chat-area">
    <q-input
      outlined
      v-model="session.title"
      label-slot
      clearable
      class="title"
      input-class="input-large"
      @blur="update_title(session.id, session.title)"
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
        bg-color="primary"
        v-model="question_message.question"
        rounded
        filled
        dense
        placeholder="在此输入消息..."
        @keyup.enter="sendMessage"
      />
      <q-icon name="send" class="icon2" @click="sendMessage" />
    </div>

    <div style="margin-top: 100px">
      <q-fab
        v-model="fabLeft"
        vertical-actions-align="left"
        color="primary"
        glossy
        icon="keyboard_arrow_up"
        direction="up"
        style="margin: 0 auto"
      >
        <q-fab-action
          label-position="right"
          color="accent"
          icon="report"
          label="投诉"
          @click="report = true"
        />
        <q-fab-action
          label-position="right"
          color="primary"
          icon="note"
          label="笔记"
          @click="note = true"
        />
      </q-fab>

      <q-dialog v-model="report" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6" style="display: flex; align-items: center">
              <span style="flex: 1">您的投诉</span>
              <q-btn-dropdown color="primary" :label="complain_type" style="margin-left: auto">
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick('信息不准确')">
                    <q-item-section>
                      <q-item-label>信息不准确</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick('信息不完整')">
                    <q-item-section>
                      <q-item-label>信息不完整</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick('相应时间长')">
                    <q-item-section>
                      <q-item-label>相应时间长</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick('其他问题')">
                    <q-item-section>
                      <q-item-label>其他问题</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input type="textarea" v-model="report_detail" filled @keyup.enter="report = false" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="取消" v-close-popup />
            <q-btn flat label="确认" v-close-popup @click="addComplain" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="note" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">您的笔记</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input type="textarea" v-model="booknote_detail" filled @keyup.enter="note = false" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="取消" v-close-popup />
            <q-btn flat label="确认" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getSessionDetails,
  ChatSession,
  addQuestion,
  ChatMessage,
  ChatFeedback,
  updateTitle,
} from "@/api/chat";
import { updateComplaint } from "@/api/feedback";
import { formatDate } from "@/utils/date-utils";
import emitter from "@/utils/bus";
import MyChatMessage from "@/components/chat/MyChatMessage.vue";
import { ref } from "vue";

const sessionId = ref<int | undefined>(undefined);
const session = ref<ChatSession | undefined>(undefined);

const fabLeft = ref(true);
const report = ref(false);
const note = ref(false);

const report_detail = ref("");
let complain_type = ref("");
const booknote_detail = ref("");

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
async function addComplain() {
  if (report_detail.value !== "") {
    try {
      const response = await updateComplaint(report_detail.value);
    } catch (error) {
      console.error("Failed to add complain:", error);
    }
  }
}
function onItemClick(type: string) {
  complain_type.value = type;
}

async function update_title(chat_id: int, title: string) {
  if (title !== "") {
    try {
      const response = await updateTitle(chat_id, title);
      await onSessionChanged(chat_id);
      emitter.emit("session-title-changed", { id: chat_id, title });
    } catch (error) {
      console.log(error);
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

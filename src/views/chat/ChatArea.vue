<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-9">
        <div v-if="session" class="chat-area">
          <q-input
            bottom-slots
            v-model="session.title"
            counter:dense="dense"
            class="title"
            input-class="input-large"
            @blur="update_title(session.id, session.title)"
            style="font-size: 28px"
          >
            <template v-slot:hint> 更改标题 </template>
            <template v-slot:append>
              <q-expansion-item
                group="somegroup"
                icon="link"
                label="分享链接"
                style="font-size: 15px"
                default-opened
                header-class="text-primary"
                @click="create_share(session.id)"
              >
                <q-separator />
                <q-card>
                  <q-card-section style="font-size: 15px"> {{ share_link }} </q-card-section>
                </q-card>
              </q-expansion-item>
            </template>
          </q-input>

          <q-chip outline color="primary" text-color="white" icon="event">
            创建时间：{{ formatDate(session.create_time) }}
          </q-chip>
          <q-chip outline color="primary" text-color="white" icon="event">
            更新时间：{{ formatDate(session.update_time) }}
          </q-chip>

          <div ref="dialogContainerRef" class="chat-messages">
            <my-chat-message v-for="msg in session.messages" :message="msg" />
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
              <q-fab-action
                label-position="right"
                color="primary"
                icon="note"
                label="显示当前会话笔记"
                @click="allnote = true"
              />
            </q-fab>

            <q-dialog v-model="allnote" persistent>
              <q-card style="min-width: 350px">
                <q-card-section>
                  <div class="text-h6" style="display: flex; align-items: center">
                    <span style="flex: 1">您的笔记</span>
                  </div>
                </q-card-section>

                <q-card-section>
                  <q-list bordered separator>
                    <q-item v-for="(msg, index) in session.messages" :key="index">
                      <q-item-section v-if="msg.type === 2">{{ msg.content }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                  <q-btn flat label="取消" v-close-popup />
                  <q-btn flat label="确认" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-dialog v-model="report" persistent>
              <q-card style="min-width: 350px">
                <q-card-section>
                  <div class="text-h6" style="display: flex; align-items: center">
                    <span style="flex: 1">您的投诉</span>
                    <q-btn-dropdown
                      color="primary"
                      :label="complain_type"
                      style="margin-left: auto"
                    >
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
                  <q-input
                    type="textarea"
                    v-model="report_detail.content"
                    filled
                    color="white"
                    @keyup.enter="report = false"
                  />
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
                  <div class="text-h6">发布笔记</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-input
                    type="textarea"
                    v-model="booknote_detail.content"
                    filled
                    @keyup.enter="note = false"
                  />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                  <q-btn flat label="取消" v-close-popup />
                  <q-btn flat label="确认" v-close-popup @click="addBookNote(session.id)" />
                </q-card-actions>
              </q-card>
            </q-dialog>
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
        </div>
      </div>

      <div class="col-3">
        <q-list bordered separator>
          <q-item-label header>推荐话题</q-item-label>
          <q-item
            v-for="(recommend, index) in recommends"
            :key="index"
            @click="send_recommend(recommend.title)"
          >
            <q-item-section>
              <q-item-label>{{ recommend.title }}</q-item-label>
              <q-item-label caption lines="2">{{ recommend.content }}</q-item-label>
            </q-item-section>
            <q-item-secfotion side top>
              <q-item-label caption>{{ formatDateToDay(recommend.add_time) }}</q-item-label>
            </q-item-secfotion>
          </q-item>
        </q-list>
      </div>
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
import { createShare } from "@/api/share";
import { Recommendation, getRecommendations } from "@/api/recommend";
import { updateComplaint } from "@/api/feedback";
import { formatDate, formatDateToDay } from "@/utils/date-utils";
import emitter from "@/utils/bus";
import MyChatMessage from "@/components/chat/MyChatMessage.vue";
import { addNote } from "@/api/chat";
import Message from "../../utils/message";
import func from "../../../vue-temp/vue-editor-bridge";

const sessionId = ref<int | undefined>(undefined);
const session = ref<ChatSession | undefined>(undefined);
const recommends = ref<Recommendation[] | undefined>(undefined);

const fabLeft = ref(true);
const report = ref(false);
const allnote = ref(false);
const note = ref(false);
const dialogContainerRef = ref();

let report_detail = ref({
  content: "",
  category: "",
});
let complain_type = ref("");
let booknote_detail = ref({
  content: "",
  remark: "",
});
let share_data = ref({
  chat_id: 0,
  expire_time: "",
  max_uses: 0,
  readonly: false,
});
const share_link = ref("");

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

      nextTick(() => {
        dialogContainerRef.value.scrollTop = dialogContainerRef.value.scrollHeight;
      });
    } catch (error) {
      console.error("Failed to add question:", error);
    }
  }
}
async function send_recommend(title: string) {
  question_message.question = title;
  sendMessage();
}
async function addComplain() {
  if (report_detail.value.content) {
    try {
      const response = await updateComplaint(complain_type.value, report_detail.value.content);
      Message.success("发送成功");
      complain_type.value = "";
      report_detail.value.category = "";
      report_detail.value.content = "";
    } catch (error) {
      Message.error("发送投诉信息失败");
      console.error("Failed to add complain:", error);
    }
  } else {
    Message.warning("请输入完整投诉信息哦");
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

async function addBookNote(session_id: int) {
  if (booknote_detail.value.content) {
    try {
      const response = await addNote(session_id, booknote_detail.value.content, "123");
      Message.success("添加笔记成功");
      booknote_detail.value.content = "";
      booknote_detail.value.remark = "";
    } catch (error) {
      Message.error("添加笔记失败");
      console.error("Failed to add note:", error);
    }
  } else {
    Message.warning("请添加笔记信息哦");
  }
}
async function create_share(session_id: int) {
  share_data.value.chat_id = session_id;
  const response = await createShare(share_data.value);
  const share_link = response.id;
}

onMounted(async () => {
  try {
    recommends.value = await getRecommendations();
  } catch (e) {
    console.log("Not logged in");
  }
});
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
.chat-messages {
  overflow: auto;
}
.row {
  display: flex;
}
.col {
  flex: 1;
  padding: 16px;
  border: 1px solid #ccc;
}
</style>

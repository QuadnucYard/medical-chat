<template>
  <div class="modern-black-page">
    <div class="q-pa-md" style="display: flex">
      <div class="q-gutter-md" style="flex: 1">
        <div class="logo-container">
          <img
            src="https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg?w=740&t=st=1693359039~exp=1693359639~hmac=e1c4b87396670f03b3fad1745015b3048e9f7224a5785073d789e63ae23c82be"
            alt="Logo"
            style="width: 50px; height: 50px"
          />
          <!-- 使用 logo 文件夹中的 logo.svg 文件 -->
        </div>
        <div class="main-content">
          <div class="sidebar">
            <q-list bordered>
              <q-item
                v-for="(session, index) in sessions"
                :key="index"
                :class="{ 'q-item-selected': selectedSession === session.id }"
                clickable
                v-ripple
                @click="selectSession(session.id)"
              >
                <q-item-section avatar>
                  <q-avatar
                    :color="session.unread ? 'primary' : 'grey-4'"
                    text-color="white"
                    :rounded="true"
                    class="small-avatar"
                  >
                    <q-icon name="account_circle" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ session.title }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="delete" class="q-ml-xs" @click="deleteIt(session.id)" />
                </q-item-section>
              </q-item>
            </q-list>
            <q-btn push color="black" text-color="white" label="添加对话" @click="add()" />
          </div>
        </div>
      </div>
      <chat-area
        class="q-pa-md"
        v-if="selectedSession"
        style="margin-top: 60px; flex: 2"
        :sessionId="selectedSession"
      />
      <div
        class="q-pa-md q-gutter-sm"
        style="display: flex; flex-direction: column; align-items: center"
      >
        <div style="display: flex; gap: 10px">
          <q-btn color="black" label="登出" @click="onLogout" />
          <q-btn color="black" label="个人信息" router-link to="/user/info" />
        </div>

        <div style="margin-top: 500px">
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
        </div>
      </div>
    </div>

    <q-dialog v-model="report" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">您的投诉</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="report_detail" autofocus @keyup.enter="report = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" v-close-popup />
          <q-btn flat label="确认" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="note" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">您的笔记</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            filled
            v-model="booknote_detail"
            type="textarea"
            autofocus
            autogrow
            @keyup.enter="note = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" v-close-popup />
          <q-btn flat label="确认" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ChatSession, deleteSessions, getSessions, addSessions } from "@/api/chat";
import { logout } from "@/api/login";
import ChatArea from "@/views/components/ChatArea.vue";
import { Dialog } from "quasar";

const sessions = ref<ChatSession[]>([]);
const fabLeft = ref(true);
const report = ref(false);
const note = ref(false);

const report_detail = ref("");
const booknote_detail = ref("");

const selectedSession = ref<int | undefined>(undefined);
// const selectedTopic = ref<int | undefined>(undefined);

onMounted(async () => {
  try {
    sessions.value = await getSessions();
  } catch (e) {
    console.log("Not logged in");
  }

  // hotTopics.value = await getTopics();
});

function selectSession(sessionId: int) {
  selectedSession.value = sessionId;
}

async function add() {
  try {
    const response = await addSessions("123");
    sessions.value = await getSessions();
  } catch (error) {
    console.log("添加失败", error);
  }
}

async function deleteIt(chatId: int) {
  try {
    const shouldDelete = await showDeleteConfirmation();
    if (shouldDelete) {
      const response = await deleteSessions(chatId);
      sessions.value = await getSessions();
    }
  } catch (error) {
    console.error("Error deleting sessions:", error);
    throw error;
  }
}

async function showDeleteConfirmation() {
  return new Promise((resolve, reject) => {
    Dialog.create({
      title: "确认删除",
      message: "确定要删除该会话吗？",
      ok: {
        label: "确认",
        color: "negative",
      },
      cancel: {
        label: "取消",
        color: "grey-8",
      },
    })
      .onOk(() => resolve(true))
      .onCancel(() => resolve(false))
      .onDismiss(() => reject(new Error("Confirmation dialog dismissed.")));
  });
}

async function onLogout() {
  console.log("logout");
  await logout();
  location.reload();
}
</script>

<style scoped>
.input-field {
  background-color: transparent;
  color: #fff;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  padding: 5px;
  box-shadow: 0 1px 0 0 #fff;
}
.q-item-selected {
  background-color: #f0f0f0; /* 修改选中项的背景颜色 */
  font-weight: bold; /* 修改选中项的字体加粗 */
}
.chat-area {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 设置容器高度为视口高度，以撑满整个屏幕 */
  overflow: auto; /* 当聊天内容过多时，启用滚动条 */
}
.main-content {
  display: flex; /* 使用 Flexbox 布局 */
}
.sidebar {
  width: 30%; /* 设置容器宽度为屏幕的 1/4 */
}
.chat-area-container {
  flex-grow: 1; /* 占据剩余空间 */
  width: 70%; /* 设置容器宽度为屏幕的 3/4 */
  height: 100vh;
  padding: 16px; /* 添加内边距，可根据需要调整 */
  box-sizing: border-box; /* 确保内边距不会影响容器的宽度 */
}
/* 其他样式规则 */
</style>

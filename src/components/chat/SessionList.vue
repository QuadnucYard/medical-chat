<template>
  <div class="sidebar">
    <q-list bordered>
      <q-item
        v-for="(session, index) in sessions"
        :key="index"
        :class="{ 'q-item-selected': selectedId === session.id }"
        clickable
        v-ripple
        @click="selectSession(session.id)"
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white" :rounded="true" class="small-avatar">
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
      <q-item clickable v-ripple @click="add()" class="bg-teal-1">
        <q-item-section>
          <q-item-label style="text-align: center">添加对话</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { ChatSession, addSession, deleteSession, getSessions } from "@/api/chat";
import emitter from "@/utils/bus";
import { Dialog } from "quasar";

const $router = useRouter();
const $route = useRoute();

const sessions = ref<ChatSession[]>([]);
const selectedId = ref<int | undefined>(undefined);

onMounted(async () => {
  try {
    sessions.value = await getSessions();
  } catch (e) {
    console.log("Not logged in");
  }
  // hotTopics.value = await getTopics();
});

function selectSession(sessionId: int) {
  selectedId.value = sessionId;
  $router.replace({ name: "chat" });
  emitter.emit("session-changed", sessionId);
}

async function add() {
  try {
    const response = await addSession("123");
    sessions.value = await getSessions();
    selectSession(response.id);
  } catch (error) {
    console.log("添加失败", error);
  }
}

async function deleteIt(chatId: int) {
  try {
    const shouldDelete = await showDeleteConfirmation();
    if (shouldDelete) {
      const response = await deleteSession(chatId);
      sessions.value = await getSessions();
    }
    if (chatId == selectedId.value) {
      if (sessions.value.length > 0) {
        selectSession(sessions.value[0].id);
      }
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
</script>

<style scoped>
.q-item-selected {
  background-color: #f0f0f0; /* 修改选中项的背景颜色 */
  font-weight: bold; /* 修改选中项的字体加粗 */
}
</style>

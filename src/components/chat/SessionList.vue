<template>
  <div class="sidebar">
    <q-banner rounded :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'" class="h-42">
      <template v-slot:avatar>
        <img src="/img/hospital-logo.webp" style="height: 50px" />
      </template>
    </q-banner>
    <q-list bordered separator>
      <q-item
        v-for="session in sessions"
        :key="session.id"
        :class="{ 'q-item-selected': selectedId === session.id }"
        clickable
        v-ripple
        @click="selectSession(session.id)"
      >
        <q-item-section avatar>
          <q-avatar color="primary-5" text-color="white" rounded class="small-avatar">
            <q-icon :name="userStore.isUserMe(session.user_id) ? 'headset_mic' : 'earbuds'" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label v-if="session.title">{{ session.title }}</q-item-label>
          <q-item-label v-else>新的聊天</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn flat round push icon="delete" size="sm" class="q-ml-xs" @click.stop="deleteSession(session.id)" />
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple @click="addSession()">
        <q-item-section avatar>
          <q-icon color="primary" name="add" />
        </q-item-section>
        <q-item-section>
          <q-item-label> 添加对话 </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple @click="complainDialogRef?.show()">
        <q-item-section avatar>
          <q-icon color="primary" name="send" />
        </q-item-section>
        <q-item-section>
          <q-item-label> 反馈 </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-space />
    <complain-dialog ref="complainDialogRef" />
    <q-space />

    <q-chip clickable color="primary" text-color="white" icon="groups">
      <span class="chip-text">加入群组</span>
    </q-chip>
  </div>
</template>

<script setup lang="ts">
import ComplainDialog from "./ComplainDialog.vue";

import { Dialog } from "quasar";

import { useChatStore } from "@/stores/chat";
import { useUserStore } from "@/stores/user";
import emitter from "@/utils/bus";

const $router = useRouter();

const userStore = useUserStore();
const chatStore = useChatStore();

const { sessions } = storeToRefs(chatStore);

const selectedId = ref<int | undefined>(undefined);

const complainDialogRef = ref<InstanceType<typeof ComplainDialog>>();

onMounted(chatStore.fetchAll);

function selectSession(sessionId: int) {
  selectedId.value = sessionId;
  $router.replace({ name: "chat" });
  emitter.emit("session-changed", sessionId);
}

async function addSession() {
  const session = await chatStore.addSession();
  selectSession(session.id);
}

async function deleteSession(chatId: int) {
  const shouldDelete = await showDeleteConfirmation();
  if (shouldDelete) {
    await chatStore.deleteSession(chatId);
    if (chatId == selectedId.value) {
      if (sessions.value.length > 0) {
        selectSession(sessions.value[0].id);
      }
    }
  }
}

async function showDeleteConfirmation() {
  return new Promise((resolve, reject) => {
    Dialog.create({
      title: "确认删除",
      message: "确定要删除该会话吗？",
      ok: { label: "确认", color: "green-6" },
      cancel: { label: "取消", color: "red-6" },
    })
      .onOk(() => resolve(true))
      .onCancel(() => resolve(false))
      .onDismiss(() => reject(new Error("Confirmation dialog dismissed.")));
  });
}

emitter.on("session-title-changed", ({ id, title }) => {
  const session = sessions.value.find((t) => t.id == id);
  if (session) session.title = title;
});
</script>

<style scoped>
.q-item-selected {
  background-color: #f0f0f0; /* 修改选中项的背景颜色 */
  font-weight: bold; /* 修改选中项的字体加粗 */
}
.centered-section {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

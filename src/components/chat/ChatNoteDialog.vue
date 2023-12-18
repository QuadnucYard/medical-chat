<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">发布笔记</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input type="textarea" v-model="noteDetail.content" filled @keyup.enter="visible = false" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="取消" v-close-popup />
        <q-btn flat label="确认" v-close-popup @click="addBookNote" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { ChatSession } from "@/interfaces";
import { useChatStore } from "@/stores/chat";
import Message from "@/utils/message";

const props = defineProps<{ session: ChatSession }>();

const chatStore = useChatStore();

const visible = ref(false);

const noteDetail = reactive({
  content: "",
  remark: "",
});

async function addBookNote() {
  if (!noteDetail.content.trim()) {
    Message.warning("请添加笔记信息哦");
    return;
  }
  try {
    await chatStore.addNote(props.session, noteDetail);
    Message.success("添加笔记成功");
    noteDetail.content = "";
    noteDetail.remark = "";
  } catch (error) {
    Message.error("添加笔记失败");
    console.error("Failed to add note:", error);
  }
}

function show() {
  visible.value = true;
}

defineExpose({ show });
</script>

<style scoped></style>

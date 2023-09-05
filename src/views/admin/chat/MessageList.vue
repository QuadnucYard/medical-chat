<template>
  <div>
    <q-table
      title="聊天消息反馈"
      :rows="rows"
      :columns="columns"
      row-key="name"
      binary-state-sort
      square
      flat
      dense
      class="my-sticky-table-handle"
      :filter="filter"
      :pagination="initialPagination"
    >
      <template v-slot:top>
        <div class="q-gutter-md">
          <q-btn color="green" icon="add" label="新建" unelevated rounded class="l-shadow-2" />
          <q-btn
            color="orange"
            icon="visibility"
            label="审核"
            unelevated
            rounded
            class="l-shadow-2"
          />
        </div>
        <q-space />
        <q-input dense outlined debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ChatFeedbackDetailed, getAllFeedbacks } from "@/api/chat";

const columns = [
  { name: "id", label: "ID", field: "id" },
  { name: "user", label: "用户", field: (row: ChatFeedbackDetailed) => row.user.username },
  {
    name: "msg",
    label: "消息",
    field: (row: ChatFeedbackDetailed) => row.msg.content.slice(0, 10),
  },
  { name: "mark_like", label: "👍", field: "mark_like" },
  { name: "mark_dislike", label: "👎", field: "mark_dislike" },
  { name: "content", label: "评论", field: "content" },
  { name: "update_time", label: "反馈时间", field: "update_time" },
];

const rows = ref<ChatFeedbackDetailed[]>([]);

const initialPagination = {
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 20,
  // rowsNumber: xx if getting data from a server
};

const filter = ref("");

onMounted(async () => {
  const resp = await getAllFeedbacks();
  rows.value = resp;
});
</script>

<style scoped></style>

<template>
  <div>
    <q-table
      title="聊天会话"
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
import { ChatSession, ChatMessage, getAllSessions } from "@/api/chat";

import { date } from 'quasar'

const columns = [
  { name: "id", label: "ID", field: "id" },
  { name: "user", label: "用户", field: (row: ChatSession)=> row.user.username},
  { name: "title", label: "标题", field: "title" },
  { name: "create_time", label: "注册时间", field: (row: ChatSession)=> {
    return date.formatDate(new Date(row.create_time), 'YYYY-MM-DD HH:mm:ss')
  }},
  { name: "update_time", label: "更新时间", field: (row: ChatSession)=> {
    return date.formatDate(new Date(row.update_time), 'YYYY-MM-DD HH:mm:ss')
  }},
  { name: "delete_time", label: "删除时间", field: (row: ChatSession)=> {
    return date.formatDate(new Date(row.delete_time), 'YYYY-MM-DD HH:mm:ss')
  }}
];

const rows = ref<ChatSession[]>([]);

const initialPagination = {
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 20,
  // rowsNumber: xx if getting data from a server
};

const filter = ref("");

onMounted(async() => {
  const resp = await getAllSessions();
  rows.value = resp;
});
</script>

<style scoped></style>

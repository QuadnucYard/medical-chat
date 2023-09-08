<template>
    <div class="q-pa-md">
      <q-table
        grid
        ref="tableRef"
        title="聊天会话"
        :rows="rows"
        :columns="columns"
        row-key="id"
        binary-state-sort
        square
        flat
        dense
        class="my-sticky-table-handle"
        :filter="filter"
        :loading="loading"
        v-model:pagination="pagination"
        @request="onRequest"
      >
        <template #top>
          <div class="q-gutter-md">
            <q-btn color="green" icon="navigation" label="已处理" unelevated rounded class="l-shadow-2" />
            <q-btn
              color="red"
              icon="delete"
              label="待处理"
              unelevated
              rounded
              class="l-shadow-2"
            />
          </div>
          <q-space />
          <q-input dense outlined debounce="300" color="primary" v-model="filter">
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-card-section>
              <q-checkbox dense v-model="props.selected" :label="props.row.name" />
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
      </q-table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ChatSession, ChatMessage, getAllSessions } from "@/api/chat";
  import { User, getUsers, updateUser } from "@/api/user";
  import { TablePagination } from "@/typing/quasar";
  import { formatDate } from "@/utils/date-utils";
  import { addSSP, makeRequester } from "@/utils/paginating";
  import { columnDefaults } from "@/utils/table-utils";
  import { QTab, QTable } from "quasar";
  import Message from "@/utils/message";
  import { date } from 'quasar'
  
  const columns = columnDefaults(
  [
    { name: "id", label: "ID"},
    { name: "user", label: "用户", field: (row: ChatSession)=> row.user.username},
    { name: "title", label: "标题"},
    { name: "create_time", label: "注册时间", format: formatDate },
    { name: "update_time", label: "更新时间", format: formatDate },
    { name: "login_time", label: "登录时间", format: formatDate }
  ],{ sortable: true, align: "center" });
  
  const editables = ["title"];
  
  const rows = ref<ChatSession[]>([]);
  
  const tableRef = ref<QTable>();
  
  const pagination = ref<TablePagination>({
    sortBy: null,
    descending: false,
    page: 1,
    rowsPerPage: 20,
    rowsNumber: 0,
  }); // It MUST be REF!
  
  const loading = ref(false);
  const filter = ref("");
  
  onMounted(addSSP(tableRef));
  
  const onRequest = makeRequester({ rows, pagination, loading }, getAllSessions);
  
  /*TODO*/ 
  async function onUpdateEdit(user: User) {
    const res = await updateUser(user.id, user);
    Object.assign(user, res);
    Message.success("成功编辑用户信息");
  }
  </script>
  
  <style scoped></style>
  
  
  
<template>
  <div>
    <q-table
      ref="tableRef"
      title="用户"
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
import { ChatSession } from "@/api/chat";
import { User, getUsers } from "@/api/user";
import { TablePagination } from "@/typing/quasar";
import { addSSP, makeRequester } from "@/utils/paginating";
import { QTable, date } from "quasar";

const columns = [
  { name: "id", label: "ID", field: "id" },
  { name: "username", label: "用户名", field: "username" },
  { name: "email", label: "邮箱", field: "email" },
  { name: "phone", label: "电话", field: "phone" },
  { name: "name", label: "姓名", field: "name" },
  {
    name: "create_time",
    label: "注册时间",
    field: (row: ChatSession) => {
      return date.formatDate(new Date(row.create_time), "YYYY-MM-DD HH:mm:ss");
    },
  },
  {
    name: "update_time",
    label: "更新时间",
    field: (row: ChatSession) => {
      return date.formatDate(new Date(row.update_time), "YYYY-MM-DD HH:mm:ss");
    },
  },
  {
    name: "delete_time",
    label: "删除时间",
    field: (row: ChatSession) => {
      return date.formatDate(new Date(row.delete_time), "YYYY-MM-DD HH:mm:ss");
    },
  },
  { name: "is_superuser", label: "是否为超级用户", field: "is_superuser" },
  { name: "valid", label: "有效", field: "valid" },
];

const rows = ref<User[]>([]);

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

const onRequest = makeRequester({ rows, pagination, loading }, getUsers);
</script>

<style scoped></style>

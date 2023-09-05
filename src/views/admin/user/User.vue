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
import { User, getUsers } from "@/api/user";
import { TablePagination } from "@/typing/quasar";
import { addSSP, makeRequester } from "@/utils/paginating";
import { QTable } from "quasar";

const columns = [
  { name: "id", label: "ID", field: "id", sortable: true },
  { name: "username", label: "用户名", field: "username", sortable: true },
  { name: "email", label: "邮箱", field: "email", sortable: true },
  { name: "phone", label: "电话", field: "phone", sortable: true },
  { name: "name", label: "姓名", field: "name", sortable: true },
  { name: "create_time", label: "注册时间", field: "create_time", sortable: true },
  { name: "login_time", label: "登录时间", field: "login_time", sortable: true },
  { name: "update_time", label: "更新时间", field: "update_time", sortable: true },
  { name: "is_superuser", label: "是否为超级用户", field: "is_superuser", sortable: true },
  { name: "valid", label: "有效", field: "valid", sortable: true },
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

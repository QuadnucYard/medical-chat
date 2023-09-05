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
      <template #top>
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
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-is_superuser="props">
        <q-td :props="props">
          <q-checkbox
            dense
            v-model="props.row.is_superuser"
            checked-icon="star"
            unchecked-icon="star_border"
            indeterminate-icon="help"
            color="red"
            :disable="true"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-valid="props">
        <q-td :props="props">
          <q-checkbox dense size="sm" v-model="props.row.valid" />
        </q-td>
      </template>
      <template v-slot:body-cell-handle="props">
        <q-td :props="props">
          <q-btn flat dense round color="green" icon="o_edit" size="sm" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { User, getUsers } from "@/api/user";
import { TablePagination } from "@/typing/quasar";
import { formatDate } from "@/utils/date-utils";
import { addSSP, makeRequester } from "@/utils/paginating";
import { columnDefaults } from "@/utils/table-utils";
import { QTable } from "quasar";

const columns = columnDefaults(
  [
    { name: "id", label: "ID", field: "id" },
    { name: "username", label: "用户名", field: "username" },
    { name: "email", label: "邮箱", field: "email" },
    { name: "phone", label: "电话", field: "phone" },
    { name: "name", label: "姓名", field: "name" },
    { name: "create_time", label: "注册时间", field: "create_time", format: formatDate },
    { name: "update_time", label: "更新时间", field: "update_time", format: formatDate },
    { name: "login_time", label: "登录时间", field: "login_time", format: formatDate },
    { name: "is_superuser", label: "是否为超级用户", field: "is_superuser" },
    { name: "valid", label: "有效", field: "valid" },
    { name: "handle", label: "操作", field: "handle", sortable: false },
  ],
  { sortable: true, align: "center" }
);

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

<template>
  <div>
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
      binary-state-sort
      square
      flat
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
import { User, getUsers } from "@/api/user";

const columns = [
  { name: "id", label: "ID", field: "id" },
  { name: "username", label: "用户名", field: "username" },
  { name: "email", label: "邮箱", field: "email" },
  { name: "phone", label: "电话", field: "phone" },
  { name: "name", label: "姓名", field: "name" },
  { name: "create_time", label: "注册时间", field: "create_time" },
  { name: "login_time", label: "登录时间", field: "login_time" },
  { name: "update_time", label: "更新时间", field: "update_time" },
  { name: "is_superuser", label: "是否为超级用户", field: "is_superuser" },
  { name: "valid", label: "有效", field: "valid" },
/*   {
    name: "name",
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  }, */
];

const rows = ref<User[]>([]);

const initialPagination = {
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 20,
  // rowsNumber: xx if getting data from a server
};

const filter = ref("");

onMounted(async() => {
  const resp = await getUsers();
  rows.value = resp;
});
</script>

<style scoped></style>

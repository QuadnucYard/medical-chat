<template>
  <q-table
    ref="tableRef"
    title="聊天消息反馈"
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
    <template v-for="field in editables" #[`body-cell-${field}`]="props">
      <q-td :props="props">
        {{ props.row[field] }}
        <q-popup-edit v-model="props.row[field]" v-slot="scope">
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
        </q-popup-edit>
      </q-td>
    </template>
    <template #body-cell-is_superuser="props">
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
    <template #body-cell-valid="props">
      <q-td :props="props">
        <q-checkbox dense size="sm" v-model="props.row.valid" />
      </q-td>
    </template>
    <template #body-cell-handle="props">
      <q-td :props="props">
        <q-btn flat dense round color="green" icon="o_edit" size="sm" @click="onUpdateEdit(props.row)" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { ChatFeedbackDetailed, getAllFeedbacks } from "@/api/chat";
import { User, updateUser } from "@/api/user";
import { TablePagination } from "@/typing/quasar";
import { formatDate } from "@/utils/date-utils";
import Message from "@/utils/message";
import { addSSP, makeRequester } from "@/utils/paginating";
import { columnDefaults } from "@/utils/table-utils";
import { QTable } from "quasar";

const columns = columnDefaults(
  [
    { name: "user", label: "用户", field: (row: ChatFeedbackDetailed) => row.user.username },
    {
      name: "msg",
      label: "消息",
      field: (row: ChatFeedbackDetailed) => row.msg.content.slice(0, 10),
    },
    { name: "mark_like", label: "👍", format: (val) => (val ? "👍" : "") },
    { name: "mark_dislike", label: "👎", format: (val) => (val ? "👎" : "") },
    { name: "content", label: "评论" },
    { name: "update_time", label: "反馈时间", format: formatDate },
  ],
  { sortable: true, align: "center" }
);

const editables = ["content"];

const rows = ref<ChatFeedbackDetailed[]>([]);

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

const onRequest = makeRequester({ rows, pagination, loading }, getAllFeedbacks);

/*TODO*/
async function onUpdateEdit(user: User) {
  const res = await updateUser(user.id, user);
  Object.assign(user, res);
  Message.success("成功编辑用户信息");
}
</script>

<style scoped></style>

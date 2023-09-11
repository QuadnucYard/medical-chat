<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">设置链接</div>
      </q-card-section>

      <q-card-section>
        <q-row>
          <q-col cols="1">
            <q-select v-model="share_data.expire_time" :options="expire_time_options" label="有效天数" />
          </q-col>
          <q-col cols="1">
            <q-select v-model="share_data.max_uses" :options="max_uses_options" label="最多使用次数" />
          </q-col>
          <q-col cols="1">
            <q-toggle
              :label="readonly_model"
              color="pink"
              false-value="可更改"
              true-value="只可读"
              v-model="readonly_model"
            />
          </q-col>
        </q-row>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="取消" v-close-popup />
        <q-btn flat label="确认" v-close-popup @click="create_link" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ChatSession } from "@/api/chat";
import Message from "@/utils/message";
import { createShare } from "@/api/share";

const props = defineProps<{ session: ChatSession }>();

const visible = ref(false);
const expire_time_options = ["1", "3", "7", "10", "30"];
const max_uses_options = ["1", "3", "7", "10", "无限"];
let readonly_model = ref("只可读");

const share_data = ref({
  chat_id: props.session.id,
  expire_time: "",
  max_uses: 0,
  readonly: true,
});

async function create_link() {
  try {
    if (readonly_model.value === "只可读") {
      share_data.value.readonly = true;
    } else {
      share_data.value.readonly = false;
    }
    const response = await createShare({
      chat_id: share_data.value.chat_id,
      expire_time: share_data.value.expire_time,
      max_uses: share_data.value.max_uses,
      readonly: share_data.value.readonly,
    });
  } catch (e) {
    console.log(e);
  }
}

function show() {
  visible.value = true;
  console.log("show");
}

defineExpose({ show });
</script>

<style scoped></style>

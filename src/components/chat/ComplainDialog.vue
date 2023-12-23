<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 600px;min-height=600px">
      <q-card-section>
        <div class="text-h6" style="display: flex; align-items: center">
          <span style="flex: 1">您的反馈</span>
          <q-btn-dropdown color="primary" :label="reportDetail.type" style="margin-left: auto">
            <q-list>
              <q-item v-for="item in reasons" clickable v-close-popup @click="onItemClick(item)">
                <q-item-section>
                  <q-item-label>{{ item }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          type="textarea"
          style="min-height=600px"
          v-model="reportDetail.content"
          filled
          color="white"
          @keyup.enter="visible = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="取消" v-close-popup />
        <q-btn flat label="确认" v-close-popup @click="addComplain" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { postComplaint } from "@/api/complaint";
import Message from "@/utils/message";

const reasons = ["信息不准确", "信息不完整", "响应时间长", "其他问题"];

const visible = ref(false);

const reportDetail = reactive({
  type: "",
  content: "",
  category: "",
});

function onItemClick(type: string) {
  reportDetail.type = type;
}

async function addComplain() {
  if (!reportDetail.content) {
    Message.warning("请输入完整反馈信息哦");
    return;
  }
  try {
    const response = await postComplaint(reportDetail);
    Message.success("您的反馈是我们前进的动力");
    reportDetail.type = "";
    reportDetail.category = "";
    reportDetail.content = "";
  } catch (error) {
    Message.error("发送反馈信息失败");
  }
}

function show() {
  visible.value = true;
}

defineExpose({ show });
</script>

<style scoped></style>

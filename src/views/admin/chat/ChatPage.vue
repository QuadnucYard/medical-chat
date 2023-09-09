<template>
  <admin-page>
    <admin-section-card>
      <chat-chart :data="stats" style="height: 300px" />
    </admin-section-card>
    <admin-section-card>
      <chat-table />
    </admin-section-card>
  </admin-page>
</template>

<script setup lang="ts">
import { ChatStats, getChatStats } from "@/api/chat";
import ChatChart from "./components/ChatChart.vue";
import ChatTable from "./components/ChatTable.vue";

const stats = ref<ChatStats>({
  total_chats: 0,
  total_messages: 0,
  total_chats_today: 0,
  total_messages_today: 0,
  total_chats_yesterday: 0,
  total_messages_yesterday: 0,
  by_date: [],
});

onMounted(updateStats);

async function updateStats() {
  stats.value = await getChatStats();
}
</script>

<style scoped></style>

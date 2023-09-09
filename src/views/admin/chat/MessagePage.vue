<template>
  <admin-page>
    <admin-section-card>
      <feedback-chart :data="stats" style="height: 300px" />
    </admin-section-card>
    <admin-section-card>
      <feedback-table />
    </admin-section-card>
  </admin-page>
</template>

<script setup lang="ts">
import { FeedbackStats, getFeedbackStats } from "@/api/feedback";
import FeedbackChart from "./components/FeedbackChart.vue";
import FeedbackTable from "./components/FeedbackTable.vue";

const stats = ref<FeedbackStats>({
  total: 0,
  total_today: 0,
  total_like_today: 0,
  total_dislike_today: 0,
  total_yesterday: 0,
  total_like_yesterday: 0,
  total_dislike_yesterday: 0,
  by_date: []
});

onMounted(updateStats);

async function updateStats() {
  stats.value = await getFeedbackStats();
}
</script>

<style scoped></style>

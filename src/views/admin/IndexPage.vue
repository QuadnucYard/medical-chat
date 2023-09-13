<template>
  <admin-page>
    <admin-section-card v-if="chatStats">
      <chat-chart :data="chatStats" style="height: 200px" />
    </admin-section-card>
    <admin-section-card v-if="feedbackStats">
      <feedback-chart :data="feedbackStats" style="height: 200px" />
    </admin-section-card>
    <div class="row">
      <admin-section-card v-if="feedbackStats" class="col-4">
        <feedback-gauge :data="feedbackStats" style="height: 200px" />
      </admin-section-card>
      <admin-section-card v-if="complaintStats" class="col">
        <complaint-chart :data="complaintStats" style="height: 200px" />
      </admin-section-card>
    </div>
  </admin-page>
</template>

<script setup lang="ts">
import { ChatStats, getChatStats } from "@/api/chat";
import ChatChart from "./chat/components/ChatChart.vue";
import FeedbackChart from "./chat/components/FeedbackChart.vue";
import FeedbackGauge from "./chat/components/FeedbackGauge.vue";
import ComplaintChart from "./user/components/ComplaintChart.vue";
import { FeedbackStats, getFeedbackStats } from "@/api/feedback";
import { ComplaintStats, getComplaintStats } from "@/api/complaint";

const chatStats = ref<ChatStats>();
const feedbackStats = ref<FeedbackStats>();
const complaintStats = ref<ComplaintStats>();

onMounted(async () => {
  chatStats.value = await getChatStats();
  feedbackStats.value = await getFeedbackStats();
  complaintStats.value = await getComplaintStats();
});
</script>
<style scoped></style>

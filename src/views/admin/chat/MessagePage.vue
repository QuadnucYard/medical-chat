<template>
  <admin-page>
    <admin-section-card>
      <feedback-chart style="height: 300px" />
    </admin-section-card>
    <admin-section-card>
      <feedback-table />
    </admin-section-card>
  </admin-page>
</template>

<script setup lang="ts">
import FeedbackChart from "./components/FeedbackChart.vue";
import FeedbackTable from "./components/FeedbackTable.vue";
</script>

<style scoped></style>

<template>
  <admin-page>
    <admin-section-card>
      <chat-chart style="height: 300px" />
    </admin-section-card>
    <admin-section-card>
      <chat-table />
    </admin-section-card>
  </admin-page>
</template>

<script setup lang="ts">
import ChatChart from "./components/ChatChart.vue";
import ChatTable from "./components/ChatTable.vue";
</script>

<style scoped></style>

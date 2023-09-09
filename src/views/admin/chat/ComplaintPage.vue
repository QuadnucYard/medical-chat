<template>
  <admin-page>
    <admin-section-card>
      <q-card-section>
        <div class="row">
          <div class="col">
            <div class="row q-col-gutter-lg">
              <progress-card title="总投诉" :value="stats.total" :progress="1.0" color="red" class="col-6" />
              <progress-card
                title="已处理投诉"
                :value="stats.resolved"
                :progress="stats.resolved / stats.total"
                color="green"
                class="col-6"
              />
              <progress-card
                title="今日投诉"
                :value="stats.total_today / stats.total"
                :progress="1"
                color="orange"
                class="col-6"
              />
              <progress-card
                title="今日处理投诉"
                :value="stats.resolved_today"
                :progress="stats.resolved_today / stats.total_today"
                color="light-green"
                class="col-6"
              />
            </div>
          </div>
          <div class="col-8">
            <complaint-chart :data="stats" style="height: 160px" />
          </div>
        </div>
      </q-card-section>
    </admin-section-card>
    <admin-section-card>
      <complaint-table />
    </admin-section-card>
  </admin-page>
</template>

<script setup lang="ts">
import { ComplaintStats, getComplaintStats } from "@/api/complaint";
import ComplaintChart from "./components/ComplaintChart.vue";
import ComplaintTable from "./components/ComplaintTable.vue";

const stats = ref<ComplaintStats>({
  total: 0,
  total_today: 0,
  resolved: 0,
  resolved_today: 0,
  by_date: [],
});

onMounted(updateStats);

async function updateStats() {
  stats.value = await getComplaintStats();
}
</script>

<style scoped></style>

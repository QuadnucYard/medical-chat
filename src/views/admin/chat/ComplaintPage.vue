<template>
  <admin-page>
    <admin-section-card>
      <q-card-section>
        <div class="row">
          <div class="col">
            <div class="row q-col-gutter-lg">
              <progress-card title="总投诉" :value="100" :progress="0.7" color="red" class="col-6" />
              <progress-card title="已处理投诉" :value="100" :progress="0.8" color="green" class="col-6" />
              <progress-card title="今日投诉" :value="100" :progress="0.8" color="orange" class="col-6" />
              <progress-card title="今日处理投诉" :value="100" :progress="0.3" color="light-green" class="col-6" />
            </div>
          </div>
          <div class="col-8">
            <complaint-chart style="height: 160px" />
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
import ComplaintChart from "./components/ComplaintChart.vue";
import ComplaintTable from "./components/ComplaintTable.vue";

</script>

<style scoped></style>

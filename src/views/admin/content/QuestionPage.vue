<template>
  <admin-page>
    <div class="row">
      <div class="col-4 q-pa-sm">
        <admin-section-card style="height: 300px">
          <div class="text-h6 text-center">词语</div>
          <q-separator />
          <word-cloud :data="stats.word" />
        </admin-section-card>
      </div>
      <div class="col-4 q-pa-sm">
        <admin-section-card style="height: 300px">
          <div class="text-h6 text-center">意图</div>
          <q-separator />
          <word-cloud :data="stats.intent" />
        </admin-section-card>
      </div>
      <div class="col-4 q-pa-sm">
        <admin-section-card style="height: 300px">
          <div class="text-h6 text-center">实体</div>
          <q-separator />
          <word-cloud :data="stats.entity" />
        </admin-section-card>
      </div>
    </div>
  </admin-page>
</template>

<script setup lang="ts">
import { QuestionStats, getQuestionStats } from "@/api/question";

const stats = ref<QuestionStats>({ word: {}, intent: {}, entity: {} });

onMounted(updateStats);

async function updateStats() {
  stats.value = await getQuestionStats();
}
</script>

<style scoped></style>

<template>
  <q-list bordered separator>
    <q-item-label header>推荐话题</q-item-label>
    <q-separator />
    <q-item v-for="(recommend, index) in recommends" :key="index" @click="sendRecommend(recommend)">
      <q-item-section avatar>
        <q-icon color="red" name="whatshot" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ recommend.title }}</q-item-label>
        <q-item-label caption lines="2">{{ recommend.content }}</q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-item-label caption>{{ formatDateToDay(recommend.add_time) }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { Recommendation, getRecommendations } from "@/api/recommend";
import { formatDateToDay } from "@/utils/date-utils";

const recommends = ref<Recommendation[]>([]);

const emit = defineEmits<{ send: [string] }>();

onMounted(async () => {
  recommends.value = await getRecommendations();
});

function sendRecommend(recommend: Recommendation) {
  emit("send", recommend.title);
}
</script>

<style scoped></style>

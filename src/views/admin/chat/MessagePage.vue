<template>
  <admin-page>
    <admin-section-card>
      <q-card-section>
        <div class="row">
          <div class="col">
            <div class="row q-col-gutter-lg">
              <progress-card
                title="😅总数"
                :value="stats.total"
                :progress="1"
                color="brown-14"
                indeterminate
                class="col-5"
              />
              <progress-card
                title="今日😅"
                :progress="stats.total_today / stats.total_yesterday"
                color="brown-14"
                class="col-7"
              >
                <template #value>
                  {{ stats.total_today }}
                  <span style="font-size: 60%">{{ inc_rate(stats.total_today, stats.total_yesterday) }}</span>
                </template>
              </progress-card>
              <progress-card
                title="👍总数"
                :value="stats.total_like"
                :progress="1"
                color="green-14"
                indeterminate
                class="col-5"
              />
              <progress-card
                title="今日👍"
                :progress="stats.total_like_today / stats.total_like_yesterday"
                color="green-13"
                class="col-7"
              >
                <template #value>
                  {{ stats.total_like_today }}
                  <span style="font-size: 60%">{{ inc_rate(stats.total_like_today, stats.total_like_yesterday) }}</span>
                </template>
              </progress-card>
              <progress-card
                title="👎总数"
                :value="stats.total_dislike"
                :progress="1"
                color="red-14"
                indeterminate
                class="col-5"
              />
              <progress-card
                title="今日👎"
                :progress="stats.total_dislike_today / stats.total_dislike_yesterday"
                color="red-13"
                class="col-7"
              >
                <template #value>
                  {{ stats.total_dislike_today }}
                  <span style="font-size: 60%">
                    {{ inc_rate(stats.total_dislike_today, stats.total_dislike_yesterday) }}
                  </span>
                </template>
              </progress-card>
            </div>
          </div>
          <div class="col-7">
            <feedback-gauge :data="stats" style="height: 250px" />
          </div>
        </div>
      </q-card-section>
    </admin-section-card>
    <admin-section-card>
      <!-- <q-card-section> -->
      <feedback-chart :data="stats" style="height: 240px" />
      <!-- </q-card-section> -->
    </admin-section-card>
    <admin-section-card>
      <feedback-table />
    </admin-section-card>
  </admin-page>
</template>

<script setup lang="ts">
import { FeedbackStats, getFeedbackStats } from "@/api/feedback";
import FeedbackChart from "./components/FeedbackChart.vue";
import FeedbackGauge from "./components/FeedbackGauge.vue";
import FeedbackTable from "./components/FeedbackTable.vue";

const stats = ref<FeedbackStats>({
  total: 0,
  total_like: 0,
  total_dislike: 0,
  total_comment: 0,
  total_today: 0,
  total_like_today: 0,
  total_dislike_today: 0,
  total_comment_today: 0,
  total_yesterday: 0,
  total_like_yesterday: 0,
  total_dislike_yesterday: 0,
  total_comment_yesterday: 0,
  by_date: [],
});

onMounted(updateStats);

async function updateStats() {
  stats.value = await getFeedbackStats();
}

function inc_rate(a: number, b: number) {
  return `${a >= b ? "+" : ""}${(((a - b) / b) * 100).toFixed(1)}%`;
}
</script>

<style scoped></style>

<template>
  <div>
    <q-card square flat>
      <q-card-section>
        <q-toggle v-model="dark" color="green" label="暗色模式" @click="$q.dark.toggle" />
      </q-card-section>
    </q-card>
    <q-card square flat>
      <q-card-section>
        <div class="text-subtitle2">修改主题色</div>
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <template v-for="color in colors">
            <div class="col-4 column">
              <q-btn
                unelevated
                :style="{ 'background-color': color }"
                @click="changeColor(color)"
              />
            </div>
          </template>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { setCssVar } from "quasar";

const colors = ["#7c00d0", "#df1256", "#ff9800", "#1976D2", "#4caf50", "#795548"];

const dark = ref(false);
function changeColor(color: string) {
  setCssVar("primary", color);
}
</script>

<style scoped></style>

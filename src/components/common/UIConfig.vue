<template>
  <div>
    <q-card square flat>
      <q-card-section>
        <q-toggle v-model="dark" color="green" label="暗色模式" @click="$q.dark.toggle" />
      </q-card-section>
    </q-card>

    <q-card square flat>
      <q-card-section>
        <q-toggle v-model="backgroundpic" color="green" label="背景图片" @click="$q.dark.toggle" />
      </q-card-section>
    </q-card>

    <q-card square flat>
      <q-card-section>
        <div class="text-subtitle2">修改主题色</div>
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <template v-for="color in themeColors">
            <div class="col-4 column">
              <q-btn unelevated :style="{ 'background-color': color }" @click="changePrimaryColor(color)" />
            </div>
          </template>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { colors, getCssVar, setCssVar } from "quasar";

const themeColors = ["#7c00d0", "#df1256", "#ff9800", "#1976D2", "#4caf50", "#795548"];

const dark = ref(false);
function changePrimaryColor(color: string) {
  const { lighten } = colors;
  setCssVar("primary", color);
  setCssVar("chat-message-sent-bg", lighten(color, 65));
  setCssVar("chat-message-received-bg", lighten(color, 80));
  setCssVar("primary-4", lighten(color, 60));
  setCssVar("primary-dark", lighten(color, -20));
}

onBeforeMount(() => {
  changePrimaryColor(getCssVar("primary")!);
});
</script>

<style scoped></style>

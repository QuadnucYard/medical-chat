<template>
  <div>
    <div class="row items-center">
      <div class="col">
        <div class="row">
          <div class="col text-subtitle1">{{ title }}</div>
        </div>
        <div class="row">
          <div class="col text-caption text-grey-7">{{ caption }}</div>
        </div>
      </div>
      <div :class="`col-auto text-h4 text-${color} text-bold`">{{ value }}</div>
    </div>
    <div class="row q-mt-sm">
      <q-linear-progress stripe size="8px" :value="progress" :color="color" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{ title: string; caption?: string; value: number | string; progress: number; color?: string }>(),
  { caption: "", color: "primary" }
);
</script>

<style scoped></style>

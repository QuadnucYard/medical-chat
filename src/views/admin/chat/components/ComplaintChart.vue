<template>
  <v-chart :option="option" />
</template>

<script setup lang="ts">
import type { BarSeriesOption } from "echarts/charts";
import { BarChart } from "echarts/charts";
import type {
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
} from "echarts/components";
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
} from "echarts/components";
import type { ComposeOption } from "echarts/core";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";

use([
  TooltipComponent,
  ToolboxComponent,
  DatasetComponent,
  LegendComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
]);

type EChartsOption = ComposeOption<
  | TooltipComponentOption
  | ToolboxComponentOption
  | DatasetComponentOption
  | LegendComponentOption
  | GridComponentOption
  | BarSeriesOption
>;

const data = {
  total: 6,
  resolved: 3,
  by_date: [
    {
      date: "2023-08-29",
      creation: 1,
      resolution: 0,
    },
    {
      date: "2023-08-30",
      creation: 0,
      resolution: 1,
    },
    {
      date: "2023-09-03",
      creation: 1,
      resolution: 0,
    },
    {
      date: "2023-09-08",
      creation: 3,
      resolution: 0,
    },
    {
      date: "2023-09-09",
      creation: 0,
      resolution: 2,
    },
    {
      date: "2023-09-13",
      creation: 1,
      resolution: 0,
    },
  ],
};

const option = reactive<EChartsOption>({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: { color: "#999" },
    },
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  dataset: {
    dimensions: ["date", "creation", "resolution"],
    source: data.by_date,
  },
  legend: {
    data: ["创建", "解决"],
  },
  xAxis: [
    {
      type: "category",
      axisPointer: { type: "shadow" },
    },
  ],
  yAxis: [{ type: "value", name: "数量", minInterval: 1 }],
  grid: {
bottom: 20
  },
  series: [
    { name: "创建", type: "bar" },
    { name: "解决", type: "bar" },
  ],
});
</script>

<style scoped></style>

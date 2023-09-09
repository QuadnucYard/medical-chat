<template>
  <v-chart :option="option" />
</template>

<script setup lang="ts">
import * as echarts from "echarts/core";
import {
  DatasetComponent,
  DatasetComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
} from "echarts/components";
import { LineChart, LineSeriesOption, BarChart, BarSeriesOption } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";

echarts.use([
  DatasetComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
  UniversalTransition,
]);

type EChartsOption = echarts.ComposeOption<
  | DatasetComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
  | BarSeriesOption
>;

const data = {
  total: 404,
  by_date: [
    {
      date: "2023-09-06",
      total: 202,
      like: 100,
      dislike: 60,
      comments: 47,
    },
    {
      date: "2023-09-07",
      total: 2,
      like: 1,
      dislike: 1,
      comments: 1,
    },
    {
      date: "2023-09-08",
      total: 200,
      like: 107,
      dislike: 68,
      comments: 39,
    },
  ],
};

const option = <EChartsOption>{
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
      magicType: { show: true, type: ["line", "bar"] },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  dataset: {
    dimensions: ["date", "total", "like", "dislike", "comments"],
    source: data.by_date,
  },
  legend: {
    data: ["总反馈数", "赞", "踩", "评论"],
  },
  xAxis: [
    {
      type: "category",
      axisPointer: { type: "shadow" },
    },
  ],
  yAxis: [{ type: "value", name: "反馈数" }],
  series: [
    { name: "总反馈数", type: "line" },
    { name: "赞", type: "bar" },
    { name: "踩", type: "bar" },
    { name: "评论", type: "bar" },
  ],
};
</script>

<style scoped></style>

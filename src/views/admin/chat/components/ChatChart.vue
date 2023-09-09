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
  total_chats: 415,
  total_messages: 2143,
  by_date: [
    {
      date: "2023-09-06",
      total_chats: 212,
      total_messages: 1008,
      questions: 535,
      answers: 473,
      notes: 0,
    },
    {
      date: "2023-09-07",
      total_chats: 3,
      total_messages: 99,
      questions: 53,
      answers: 46,
      notes: 0,
    },
    {
      date: "2023-09-08",
      total_chats: 200,
      total_messages: 1036,
      questions: 512,
      answers: 516,
      notes: 8,
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
    dimensions: ["date", "total_chats", "total_messages", "questions", "answers", "notes"],
    source: data.by_date,
  },
  legend: {
    data: ["总会话数", "总消息数", "提问", "回答", "笔记"],
  },
  xAxis: [
    {
      type: "category",
      axisPointer: { type: "shadow" },
    },
  ],
  yAxis: [{ type: "value", name: "数量" }],
  series: [
    { name: "总会话数", type: "line" },
    { name: "总消息数", type: "line" },
    { name: "提问", type: "bar" },
    { name: "回答", type: "bar" },
    { name: "笔记", type: "bar" },
  ],
};
</script>

<style scoped></style>

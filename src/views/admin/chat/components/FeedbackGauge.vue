<template>
  <v-chart ref="chartRef" :option="option" />
</template>

<script lang="ts" setup>
import VChart from "vue-echarts";
import * as echarts from "echarts/core";
import { GaugeChart, GaugeSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { FeedbackStats } from "@/api/feedback";

echarts.use([GaugeChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<GaugeSeriesOption>;

const props = defineProps<{ data: FeedbackStats }>();

const chartRef = ref<InstanceType<typeof VChart>>();

const gaugeData = [
  {
    value: 20,
    name: "👍",
    title: { offsetCenter: ["0%", "-40%"] },
    detail: { valueAnimation: true, offsetCenter: ["0%", "-25%"] },
  },
  {
    value: 40,
    name: "👎",
    title: { offsetCenter: ["0%", "-5%"] },
    detail: { valueAnimation: true, offsetCenter: ["0%", "10%"] },
  },
  {
    value: 60,
    name: "💬",
    title: { offsetCenter: ["0%", "30%"] },
    detail: { valueAnimation: true, offsetCenter: ["0%", "45%"] },
  },
];

const option: EChartsOption = {
  series: [
    {
      type: "gauge",
      startAngle: 90,
      endAngle: -270,
      radius: 120,
      pointer: { show: false },
      progress: { show: true, overlap: false, roundCap: true, clip: false },
      axisLine: { lineStyle: { width: 40 } },
      splitLine: { show: false, distance: 0, length: 10 },
      axisTick: { show: false },
      axisLabel: { show: false, distance: 50 },
      data: gaugeData,
      title: { fontSize: 14 },
      detail: {
        width: 40,
        height: 8,
        fontSize: 14,
        color: "inherit",
        borderColor: "inherit",
        borderRadius: 20,
        borderWidth: 1,
        formatter: "{value}%",
      },
    },
  ],
};

watch(props, () => {
  gaugeData[0].value = props.data.total_like_today;
  gaugeData[1].value = props.data.total_dislike_today;
  gaugeData[2].value = props.data.total_comment_today;
  chartRef.value?.setOption({ series: [{ data: gaugeData }] });
});
</script>

<style scoped></style>
<template>
  <canvas ref="chart" />
</template>

<script lang="ts">
import Chart, { ChartConfiguration } from "chart.js/auto"

export default defineComponent({
  props: ["chartData", "chartType"],
  mounted() {
    new Chart(this.$refs.chart as HTMLCanvasElement, {
      type: this.chartType,
      data: this.chartData
    } as ChartConfiguration)
  }
})
</script>
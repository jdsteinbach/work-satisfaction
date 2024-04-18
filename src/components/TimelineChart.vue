<script setup>
import { computed } from "vue";
import TimelineChartColumn from "@/components/TimelineChartColumn.vue";

const props = defineProps({ responses: Array });

const sortedResponses = computed(() =>
  props.responses.sort((a, b) => (a.fields.Date < b.fields.Date ? 1 : -1))
);

const columnCount = computed(() => props.responses.length);
</script>

<template>
  <div class="chart">
    <TimelineChartColumn
      v-for="record in sortedResponses"
      :key="record"
      :record="record"
      :style="{ '--column-count': columnCount }"
    />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  display: grid;
  grid-template-columns: repeat(var(--column-count, 1), 1fr);
  column-gap: 0.125rem;
  border: 0.125rem solid currentColor;
  border-radius: 0.25rem;
}
</style>

<script setup>
import { computed } from 'vue';
import TimelineChartColumn from '@/components/TimelineChartColumn.vue';

const props = defineProps({ responses: Array });

const columnCount = computed(() => props.responses.length);

</script>

<template>
  <div class="chart">
    <TimelineChartColumn v-for="record in responses" :key="record" :record="record" :style="{ '--column-count': columnCount }"/>
  </div>
</template>

<style lang="scss" scoped>
.chart {
  display: grid;
  grid-template-columns: repeat(
    var(--column-count, 1),
    1fr
  );
  column-gap: .125rem;
  border: .125rem solid currentColor;
  border-radius: .25rem;
}
</style>

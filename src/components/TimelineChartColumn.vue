<script setup>
import { computed } from 'vue';
import { formatQuarter } from '@/utils/dates';
import { calculateWeightedScore } from '@/utils/weights';
import { formatQuarterDescriptive } from '../utils/dates';

const props = defineProps({ record: Object });

const weightedScore = computed(() => calculateWeightedScore(props.record));

const rowStart = computed(() => {
  return 101 - Math.round((weightedScore.value / 5) * 100);
});
</script>

<template>
  <div class="column">
    <output :id="record.fields.Date" class="column__bar" :style="{
      '--row-start': rowStart
    }" :aria-label="`Satisfaction score for ${formatQuarterDescriptive(record.fields.Date)}`">
      {{ weightedScore }}
    </output>
    <label :for="record.fields.Date" class="column__label">
      {{ formatQuarter(record.fields.Date) }}
    </label>
  </div>
</template>

<style lang="scss" scoped>
.column {
  --row-height: .33vh;

  display: grid;
  grid-template-columns: 1rem 1fr 1rem;
  grid-template-rows: repeat(100, var(--row-height)) auto;

  &::before {
    content: "";
    border: 1px solid var(--color-fg);
    border-width: 1px 0;
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 21;
    grid-row-end: 40;
  }

  &::after {
    content: "";
    border: 1px solid var(--color-fg);
    border-width: 1px 0;
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 61;
    grid-row-end: 80;
  }
}

.column__bar {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: var(--row-start, 1);
  grid-row-end: 101;
  text-align: center;
  border-radius: 0.125rem;
  background-color: var(--bar-color, var(--color-fg));
  color: var(--color-bg);
  opacity: 0.8;
}

.column__label {
  padding: 0.25rem 1rem;
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 101;
  grid-row-end: 102;
  border-top: 1px solid var(--color-fg);
}
</style>

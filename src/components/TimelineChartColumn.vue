<script setup>
import { computed } from "vue";
import Popper from "vue3-popper";

import { formatQuarter, formatYear } from "@/utils/dates";
import { calculateWeightedScore } from "@/utils/weights";
import { formatQuarterDescriptive } from "../utils/dates";
import SatisfactionRecord from "./SatisfactionRecord.vue";

const props = defineProps({ record: Object });

const weightedScore = computed(() => calculateWeightedScore(props.record));

const rowStart = computed(() => {
  return 101 - Math.round((weightedScore.value / 5) * 100);
});
</script>

<template>
  <div class="column">
    <div
      class="column__bar"
      :style="{
        '--row-start': rowStart,
      }"
    >
      <output
        :id="record.fields.Date"
        :aria-label="`Satisfaction score for ${formatQuarterDescriptive(
          record.fields.Date
        )}`"
      >
        {{ weightedScore }}
      </output>
    </div>

    <div class="column__label">
      <Popper arrow hover placement="top" offset-distance="0">
        <label :for="record.fields.Date" class="column__label__text">
          {{ formatQuarter(record.fields.Date) }}<br />
          {{ formatYear(record.fields.Date) }}
        </label>
        <template #content>
          <SatisfactionRecord :record="record" />
        </template>
      </Popper>
    </div>
  </div>
</template>

<style lang="scss">
.column {
  --row-height: 0.3vh;

  display: grid;
  grid-template-columns: 1rem 1fr 1rem;
  grid-template-rows: repeat(100, var(--row-height)) auto;

  &::before {
    content: "";
    border: 1px solid var(--color-fg-fade);
    border-width: 1px 0;
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 21;
    grid-row-end: 40;
  }

  &::after {
    content: "";
    border: 1px solid var(--color-fg-fade);
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
  color: var(--color-fg);
  opacity: 0.8;
}

.column__label {
  display: flex;
  justify-content: stretch;
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 101;
  grid-row-end: 102;

  > * {
    flex-grow: 1;
  }
}

.column__label__text {
  display: block;
  padding: 0.25rem 1rem;
  text-align: center;
  border-top: 1px solid var(--color-fg);
}
</style>

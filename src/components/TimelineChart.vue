<script setup>
import { computed } from "vue";
import TimelineChartColumn from "@/components/TimelineChartColumn.vue";

const props = defineProps({
  responses: {
    type: Array,
    default: () => [],
  },
});

const getQuarterStartDate = (dateInput) => {
  const date = new Date(dateInput);
  const quarterStartMonth = Math.floor(date.getMonth() / 3) * 3;

  return new Date(date.getFullYear(), quarterStartMonth, 1);
};

const getQuarterKey = (dateInput) => {
  const date = new Date(dateInput);
  const quarter = Math.floor(date.getMonth() / 3) + 1;

  return `${date.getFullYear()}-Q${quarter}`;
};

const addQuarter = (dateInput) => {
  const date = new Date(dateInput);

  return new Date(date.getFullYear(), date.getMonth() + 3, 1);
};

const sortedResponses = computed(() =>
  [...props.responses].sort((a, b) =>
    a.fields.Date < b.fields.Date ? 1 : -1
  )
);

const chartColumns = computed(() => {
  if (!sortedResponses.value.length) {
    return [];
  }

  const recordsByQuarter = new Map();

  for (const record of sortedResponses.value) {
    const quarterKey = getQuarterKey(record.fields.Date);

    if (!recordsByQuarter.has(quarterKey)) {
      recordsByQuarter.set(quarterKey, record);
    }
  }

  const oldestRecordDate = sortedResponses.value.at(-1).fields.Date;
  const oldestQuarterDate = getQuarterStartDate(oldestRecordDate);
  const currentQuarterDate = getQuarterStartDate(new Date());
  const quarterDates = [];

  for (
    let cursorDate = oldestQuarterDate;
    cursorDate <= currentQuarterDate;
    cursorDate = addQuarter(cursorDate)
  ) {
    quarterDates.push(new Date(cursorDate));
  }

  return quarterDates.reverse().map((quarterDate) => {
    const quarterKey = getQuarterKey(quarterDate);

    return {
      key: quarterKey,
      quarterDate,
      record: recordsByQuarter.get(quarterKey) || null,
    };
  });
});

const columnCount = computed(() => chartColumns.value.length);
</script>

<template>
  <div class="chart" :style="{ '--column-count': columnCount }">
    <TimelineChartColumn
      v-for="column in chartColumns"
      :key="column.key"
      :record="column.record"
      :quarter-date="column.quarterDate"
    />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  display: grid;
  grid-template-columns: repeat(var(--column-count, 1), minmax(8ch, 1fr));
  column-gap: 0.125rem;
  border: 0.125rem solid currentColor;
  border-radius: 0.25rem;
  overflow-x: auto;
  scroll-snap-type: inline mandatory;

    > * {
    scroll-snap-align: start;
  }
}
</style>

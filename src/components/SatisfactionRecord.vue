<script setup>
import { computed } from "vue";
import ExclamationCircleFill from "bootstrap-icons/icons/exclamation-circle-fill.svg";
import ExclamationTriangleFill from "bootstrap-icons/icons/exclamation-triangle-fill.svg";
import ExclamationOctagonFill from "bootstrap-icons/icons/exclamation-octagon-fill.svg";
import { formatFullDate, formatQuarter, formatYear } from "@/utils/dates";
import { calculateWeightedScore, weights } from "@/utils/weights";

const props = defineProps({ record: Object });

const filteredFields = computed(() => {
  let fields = {};
  Object.keys(props.record.fields).map((k) => {
    if (Object.keys(weights).includes(k)) {
      fields[k] = props.record.fields[k];
    }
  });
  return fields;
});

const weightedScore = computed(() => calculateWeightedScore(props.record));

const titleDate = computed(() => {
  const d = props.record.fields.Date;
  return `${formatQuarter(d)} ${formatYear(d)} (${formatFullDate(d)})`;
});

const icon = (k, v) => {
  const icons = [
    ExclamationCircleFill,
    ExclamationTriangleFill,
    ExclamationOctagonFill,
  ];
  return icons[weights[k] - v - 2];
};

const iconClass = (k, v) => {
  const iconClasses = ["concern", "alarm", "danger"];
  return ["icon", `icon--${iconClasses[weights[k] - v - 2]}`];
};

const iconDescription = (k, v) => {
  const iconDescriptions = [
    "Concerningly low value",
    "Alarmingly low value",
    "Dangerously low value",
  ];
  return iconDescriptions[weights[k] - v - 2];
};

const stars = (score) => {
  const stars = ["☆", "☆", "☆", "☆", "☆"];
  let i = 0;
  while (i < score) {
    stars[i] = "★";
    i++;
  }
  return stars.join("");
};
</script>

<template>
  <h2>{{ titleDate }}</h2>
  <dl>
    <div v-for="(v, k) in filteredFields" :key="k" class="satisfaction-row">
      <dt>
        <span>
          <component
            :is="icon(k, v)"
            :class="iconClass(k, v)"
            :aria-label="iconDescription(k, v)"
          />
        </span>
        {{ k }}
      </dt>
      <dd :aria-label="`${v} out of 5`">
        {{ stars(v) }}
      </dd>
    </div>
  </dl>
  <dl>
    <div class="satisfaction-row satisfaction-row--summary">
      <dt>Weighted Score:</dt>
      <dd>
        {{ weightedScore }}
      </dd>
    </div>
  </dl>
</template>

<style lang="scss" scoped>
h2 {
  margin: 0 0 0.5rem;
  padding: 0 0.5rem;
  font-size: 1.33rem;
}

dl {
  margin: 0;
  padding: 0 0.5rem;
}

.satisfaction-row {
  margin: 0.25rem 0;
  display: grid;
  grid-template-columns: auto 1fr;
}

dt {
  display: grid;
  grid-template-columns: 1.5rem 1fr;
  align-items: center;
}

.satisfaction-row--summary {
  font-weight: bold;

  dt {
    grid-template-columns: 1fr;
  }
}

dd {
  text-align: right;
}

.icon {
  display: block;
  height: 1rem;
  width: 1rem;
}

.icon--concern {
  fill: #f9a825;
}

.icon--alarm {
  fill: #ef6c00;
}

.icon--danger {
  fill: #c62828;
}
</style>

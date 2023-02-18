<script setup>
import { formatQuarter } from '@/utils/dates';
import { calculateWeightedScore, weights } from '@/utils/weights';

const props = defineProps({ record: Object });

const weightedScore = calculateWeightedScore(record);

const stars = score => {
	const stars = ['☆', '☆', '☆', '☆', '☆'];
	let i = 0;
	while (i < score) {
		stars[i] = '★';
		i++;
	}
	return stars.join('');
}
</script>

<template>
		<h2>{{ formatQuarter(record.fields.Date) }}</h2>
    <dl>
      <div v-for="(v, k) in record.fields" :key="k" class="satisfaction-row" :class="{'is-concerning': (weights[k] - v > 1), 'is-bad': (weights[k] - v > 2), 'is-awful': (weights[k] - v > 3)}">
        <dt v-if="Object.keys(weights).includes(k)">{{ k }}</dt>
        <dd :aria-label="`${v} out of 5`" v-if="Object.keys(weights).includes(k)">{{ stars(v) }}</dd>
      </div>
    </dl>
    <dl>
      <dt>Weighted Score:</dt>
			<dd>
				{{ weightedScore(record) }}
			</dd>
    </dl>
</template>

<style lang="scss" scoped>
dl {
  margin: 0;
  padding: 0;
}

.satisfaction-row {
  margin: 0.25rem 0;
  display: grid;
  grid-template-columns: auto 1fr;

  &[class*="is-"] {
    outline: 0.125rem solid currentColor;
    outline-offset: 0.125rem;
  }

  &.is-concerning {
    outline-color: yellow;
  }

  &.is-bad {
    outline-color: orange;
  }

  &.is-terrible {
    outline-color: red;
  }
}

dt {
  font-weight: bold;
}

dd {
  text-align: right;
}
</style>

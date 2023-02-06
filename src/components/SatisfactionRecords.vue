<script setup>
import format from 'date-fns/format';
import { getAll } from '@/utils/api';
import { weights } from '@/utils/weights';

const responses = await getAll();

const weightedScore = record => {
  const totalWeights = Object.values(weights).reduce((it, val) => (it + val), 0);

  const totalWeightedValues = Object.keys(weights).map(key => {
    return record.fields[key] * weights[key];
  }).reduce((it, val) => (it + val), 0);

  const weightedScore = totalWeightedValues / totalWeights;

  return Math.round(weightedScore * 100) / 100;
}

const stars = score => {
	const stars = ['☆', '☆', '☆', '☆', '☆'];
	let i = 0;
	while (i < score) {
		stars[i] = '★';
		i++;
	}
	return stars.join('');
}

const date = d => format(new Date(d), `'Q'Q · yyyy`);
</script>

<template>
  <div v-for="r in responses" :key="r">
		<h2>{{ date(r.fields.Date) }}</h2>
    <dl>
      <template v-for="(v, k) in r.fields" :key="k">
        <dt v-if="Object.keys(weights).includes(k)">{{ k }}</dt>
        <dd :aria-label="`${v} out of 5`" v-if="Object.keys(weights).includes(k)">{{ stars(v) }}</dd>
      </template>
    </dl>
    <dl>
      <dt>Weighted Score:</dt>
			<dd>
				{{ weightedScore(r) }}
			</dd>
    </dl>
  </div>
</template>

<style lang="scss" scoped>
dl {
  display: grid;
  grid-template-columns: auto 1fr;
}

dt {
  font-weight: bold;
}
dd {
	text-align: right;
}
</style>

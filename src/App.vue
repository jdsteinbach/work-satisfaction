<script setup>
import { ref, onMounted } from 'vue';
import { getAll } from '@/utils/api';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import TimelineChart from '@/components/TimelineChart.vue';

const responses = ref([]);

onMounted(async () => {
  responses.value = await getAll();
});
</script>

<template>
  <header>
    <h1>Work Satisfaction</h1>
  </header>
  <main>
    <template v-if="responses.length">
      <TimelineChart :responses="responses" />
    </template>
    <LoadingIndicator v-else />
  </main>
</template>

<style scoped>
:root {
  box-sizing: border-box;
}

*,
::before,
::after {
  box-sizing: inherit;
}

main {
  text-align: left;
}

h1 {
  margin: 0 0 2rem;
  font-size: 1.6rem;
  line-height: 2rem;
  text-align: center;
}
</style>

<script setup>
import SatisfactionRecords from '@/components/SatisfactionRecords.vue';
</script>

<template>
  <header>
    <h1>Work Satisfaction</h1>
  </header>
  <main>
    <Suspense>
      <SatisfactionRecords />
    </Suspense>
  </main>
</template>

<style scoped>
main {
  text-align: left;
}
</style>

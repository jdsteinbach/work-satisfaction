<script></script>

<template>
  <div class="loading-indicator" aria-live="polite" aria-label="loading"></div>
</template>

<style lang="scss" scoped>
.loading-indicator {
  margin: 2rem 0;
  position: relative;
  display: grid;
  align-items: center;
  justify-content: center;
  min-height: 6rem;

  &::before {
    content: "";
    display: block;
    height: 6rem;
    width: 6rem;
    border-radius: 6rem;
    border: 0.5rem solid currentColor;
    border-top-color: transparent;
    animation: loading-indicator 2s infinite ease-in-out;
  }
}

@keyframes loading-indicator {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

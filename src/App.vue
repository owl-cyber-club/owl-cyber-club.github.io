<script setup lang="ts">
import Hero from './components/Hero.vue'
</script>

<template>
  <main class="main-container">
    <div class="grid-background"></div>
    <Hero />
  </main>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-color: $cyber-black;
}

.grid-background {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(to right, rgba(79, 79, 79, 0.18) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(79, 79, 79, 0.18) 1px, transparent 1px);
  background-size: 14px 24px;
  mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%);
  z-index: 0;
  pointer-events: none;
}
</style>

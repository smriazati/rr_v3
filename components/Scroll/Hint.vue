<template>
  <div class="scroll-hint">
    <div v-if="!hasScrolled && showScrollHint" ref="arrow" class="icon-wrapper">
      <p class="visually-hidden">Scroll down</p>
      <SystemIcon type="arrow" :width="30" color="light" class="icon-arrow-down" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const hasScrolled = ref(false)
const showScrollHint = ref(false)
const delay = 1.5 // seconds

const startTimer = () => {
  showScrollHint.value = true
}

const handleScroll = () => {
  hasScrolled.value = true
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, false)
  setTimeout(startTimer, delay * 1000)
})

onUnmounted(() => {
  hasScrolled.value = false
  window.removeEventListener('scroll', handleScroll, false)
})
</script>

<style lang="scss">
.scroll-hint {
  text-align: center;
  display: flex;
  justify-content: center;

  .icon-wrapper {
    text-align: center;
    display: flex;
    justify-content: center;
  }

  position: absolute;
  bottom: 25%;
  left: 0;
  width: 100%;
  z-index: 100;

  .icon-wrapper {
    animation: bounceIn 2s ease-in alternate infinite;
  }
}
</style>
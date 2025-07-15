<template>
  <div class="default-layout" :class="`route-${page}`">
    <ExhibitNav />
    <nuxt :key="$route.fullPath" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const page = computed(() => route.name)

// Enable scroll to top behavior
definePageMeta({
  scrollToTop: true
})
</script>

<style lang="scss">
.default-layout {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 100vw;
  overflow-x: hidden;
}
</style>
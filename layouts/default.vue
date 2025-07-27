<template>
  <div class="default-layout" :class="`route-${String(route.name)}`">
    <ExhibitNav />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">

const route = useRoute()

// // Enable scroll to top behavior
// definePageMeta({
//   scrollToTop: true
// })

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
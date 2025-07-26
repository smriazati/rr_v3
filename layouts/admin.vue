<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="admin-layout" :class="`route-${route.name}`">
    <NuxtPage />
  </div>
</template>

<style lang="scss">
.admin-layout {
  background: white;
  color: black;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<script setup lang="ts">
import { computed } from 'vue'
const route = useRoute()
const page = computed(() => route.name)
</script>

<template>
  <div class="admin-layout" :class="`route-${page}`">
    <nuxt />
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
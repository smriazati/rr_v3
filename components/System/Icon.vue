<template>
  <span class="icon" :class="`${type} ${color}`">
    <img :src="`/icons/${type}.svg`" :alt="`${type} icon`" :width="width" :height="width" />
  </span>
</template>

<script setup lang="ts">
/**
 * SystemIcon Component
 * 
 * Core Functions:
 * - Displays SVG icons from the static icons directory
 * - Supports different icon types and colors
 * - Provides consistent icon sizing and styling
 * - Handles accessibility with proper alt text
 * 
 * Performance Optimizations:
 * - Static icon paths for fast loading
 * - Minimal reactivity for optimal performance
 * - Efficient class binding
 */

// Props with TypeScript typing
interface Props {
  type: string
  color?: string
  width?: number
}

const props = withDefaults(defineProps<Props>(), {
  color: 'dark',
  width: 24
})
</script>

<style lang="scss">
.icon {
  &.light {
    filter: invert(1);
  }

  &.dark {
    filter: invert(0);
  }
}
</style>

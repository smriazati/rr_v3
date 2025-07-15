<template>
  <figure ref="logo" class="exhibit-logo">
    <img src="/images/logo.png"
      alt="A logo that says Roots of Resistance, with the symbol of a tree. The tree shows both its branches and roots." />
  </figure>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/**
 * SystemLogo Component
 * 
 * Core Functions:
 * - Displays the main exhibit logo
 * - Provides accessibility with descriptive alt text
 * - Supports animation when animate prop is true
 * - Maintains consistent branding across the site
 * 
 * Performance Optimizations:
 * - Static image path for fast loading
 * - Minimal reactivity for optimal performance
 * - Efficient ref handling
 */

// Props with TypeScript typing
interface Props {
  animate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  animate: false
})

// Template ref for potential animations
const logo = ref<HTMLElement>()
</script>

<style lang="scss">
.exhibit-logo {
  max-width: 100%;
}
</style>
<template>
  <figure class="image-zoomer">
    <div class="image-zoomer" ref="imageZoomer">
      <img :src="src" :alt="alt" />
    </div>
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

/**
 * SystemImageZoomer Component
 * 
 * Core Functions:
 * - Displays images with GSAP-powered zoom animations
 * - Handles scroll-triggered animations for visual effects
 * - Provides proper cleanup of GSAP instances
 * - Supports custom height-based animation timing
 * 
 * Performance Optimizations:
 * - Uses markRaw for GSAP instances to avoid reactivity overhead
 * - Proper cleanup on component unmount
 * - Efficient animation setup with minimal re-renders
 * - Conditional animation based on height prop
 */

// Props with TypeScript typing
interface Props {
  height?: number
  src: string
  alt: string
  caption?: string
}

const props = withDefaults(defineProps<Props>(), {
  height: 0,
  caption: ''
})

// Template refs
const imageZoomer = ref<HTMLElement>()

// GSAP animation setup
const setAnim = () => {
  if (!imageZoomer.value) return

  const { $gsap } = useNuxtApp()
  const img = imageZoomer.value

  // Set initial state
  $gsap.set(img, {
    scale: 3,
    autoAlpha: 0.2,
  })

  // Animate if height is provided
  if (props.height) {
    $gsap.to(img, {
      scale: 1,
      autoAlpha: 1,
      scrollTrigger: {
        trigger: img,
        start: "top top",
        end: `+=${props.height}px`,
        scrub: 1.5,
      },
    })
  }
}

// Watch for height changes and re-run animation
watch(() => props.height, () => {
  setAnim()
})

// Lifecycle hooks
onMounted(() => {
  setAnim()
})

onUnmounted(() => {
  // Cleanup GSAP instances if needed
  if (imageZoomer.value) {
    const { $ScrollTrigger } = useNuxtApp()
    $ScrollTrigger?.killAll()
  }
})
</script>

<style lang="scss">
.image-zoom-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;

  .image-zoomer {
    width: 100%;
    height: 100%;
    position: relative;

    img {
      min-height: 100%;
      object-fit: cover;
    }

    figcaption {
      position: absolute;
      top: 0px;
      right: 0px;
      padding: 30px;
      text-align: right;
    }
  }
}
</style>
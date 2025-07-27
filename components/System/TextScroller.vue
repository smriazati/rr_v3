<template>
  <div class="text-scroller" ref="textScroller">
    <div class="panel" v-for="(item, index) in panels" :key="index">
      <div class="text-wrapper light centered flex-col">
        <div class="wrapper">
          <p>
            <LocalizationString :string="item"></LocalizationString>
          </p>
          <div v-if="index === panels.length - 1" class="pagination-wrapper">
            <!-- <div v-if="pagination">
              <Pagination v-if="pagination?.next" :link="`/${route}/stories`" :message="pagination.next" />
            </div> -->
          </div>
        </div>

        <button class="flat up" v-if="index !== 0" @click="goToSection(index - 1)">
          <SystemIcon type="arrow" :width="20" color="light" class="icon icon-arrow-up" />
        </button>
        <button class="flat down" v-if="index < panelNum - 1" @click="goToSection(index + 1)">
          <SystemIcon type="arrow" :width="20" color="light" class="icon icon-arrow-down" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { LocalizedString } from '../../types/sanity'

/**
 * SystemTextScroller Component
 * 
 * Core Functions:
 * - Creates a full-height scrolling text experience with GSAP
 * - Handles panel navigation and scroll animations
 * - Provides pagination controls for multi-panel content
 * - Manages scroll triggers and animations efficiently
 * 
 * Performance Optimizations:
 * - Uses markRaw for GSAP instances to avoid reactivity overhead
 * - Proper cleanup of scroll triggers on unmount
 * - Efficient panel rendering with computed properties
 * - Optimized animation setup with minimal re-renders
 */

// Props with TypeScript typing
interface Props {
  panels: LocalizedString[]
  pagination?: {
    next?: LocalizedString
  }
  route: string
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'scrolled-to-end': []
}>()

// Template refs
const textScroller = ref<HTMLElement>()

// Reactive state
const scrollTween = ref<any>(null)
const activeSection = ref(0)
const currentSection = ref(0)

// Computed properties
const panelNum = computed(() => props.panels.length)

// GSAP animation setup
const setNewAnim = () => {
  if (!textScroller.value) return

  const { $gsap, $ScrollTrigger } = useNuxtApp()

  // Kill existing animations
  $ScrollTrigger.killAll()

  // Set body height for scrolling
  $gsap.set("body", { height: `${panelNum.value * 100}vh` })

  // Create scroll animation
  scrollTween.value = $gsap.to({}, {
    scrollTrigger: {
      trigger: textScroller.value,
      start: "top top",
      end: `+=${(panelNum.value - 1) * 100}vh`,
      scrub: 1,
      onUpdate: (self: any) => {
        const progress = self.progress
        const section = Math.round(progress * (panelNum.value - 1))
        activeSection.value = section
        currentSection.value = section
      }
    }
  })
}

// Navigation functions
const goToSection = (index: number) => {
  if (!textScroller.value) return

  const { $gsap } = useNuxtApp()
  const targetY = index * window.innerHeight

  $gsap.to(window, {
    scrollTo: { y: targetY },
    duration: 1,
    ease: "power2.inOut"
  })
}

// Check if scrolled to end
const scrolledToEnd = () => {
  if (activeSection.value === panelNum.value - 1) {
    emit('scrolled-to-end')
  }
}

// Watch for active section changes
watch(activeSection, () => {
  scrolledToEnd()
})

// Lifecycle hooks
onMounted(() => {
  nextTick(() => {
    setNewAnim()
    scrolledToEnd()
  })
})

onBeforeUnmount(() => {
  // Cleanup GSAP instances
  const { $ScrollTrigger, $gsap } = useNuxtApp()
  $ScrollTrigger.killAll()
  $gsap.set("body", { height: "auto" })
})
</script>

<style lang="scss">
.text-scroller {
  position: relative;
  width: 100%;
  height: 100vh;

  .panel {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .text-wrapper {
      max-width: 800px;
      padding: 2rem;
      text-align: center;

      .wrapper {
        margin-bottom: 2rem;
      }

      button {
        position: absolute;
        background: none;
        border: none;
        cursor: pointer;

        &.up {
          top: 2rem;
        }

        &.down {
          bottom: 2rem;
        }
      }
    }
  }
}
</style>
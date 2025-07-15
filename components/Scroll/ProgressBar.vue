<template>
  <div class="scroll-progress" :class="progressClass">
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: `${progressPercentage}%` }" :aria-valuenow="progressPercentage"
        :aria-valuemin="0" :aria-valuemax="100" role="progressbar" :aria-label="progressLabel"></div>
    </div>
    <div v-if="showPercentage" class="progress-text">
      {{ Math.round(progressPercentage) }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * Scroll ProgressBar Component
 * 
 * Core Functions:
 * - Displays scroll progress indicator
 * - Tracks page scroll position
 * - Provides visual feedback for reading progress
 * - Supports different progress bar styles
 * 
 * Performance Optimizations:
 * - Efficient scroll event handling
 * - Throttled progress updates
 * - Optimized DOM updates
 */

// Props definition with TypeScript
interface Props {
  target?: string | HTMLElement
  showPercentage?: boolean
  variant?: 'default' | 'thin' | 'thick' | 'gradient'
  position?: 'top' | 'bottom' | 'left' | 'right'
  color?: string
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  showPercentage: false,
  variant: 'default',
  position: 'top',
  color: '#007bff',
  className: ''
})

// Reactive state
const scrollProgress = ref(0)

// Computed properties
const progressClass = computed(() => {
  const classes = ['scroll-progress']

  if (props.className) {
    classes.push(props.className)
  }

  if (props.variant) {
    classes.push(`variant-${props.variant}`)
  }

  if (props.position) {
    classes.push(`position-${props.position}`)
  }

  return classes.join(' ')
})

const progressPercentage = computed(() => {
  return Math.min(100, Math.max(0, scrollProgress.value))
})

const progressLabel = computed(() => {
  const labels: Record<string, string> = {
    en: `Page scroll progress: ${Math.round(progressPercentage.value)}%`,
    uk: `Прогрес прокрутки сторінки: ${Math.round(progressPercentage.value)}%`,
    es: `Progreso de desplazamiento de página: ${Math.round(progressPercentage.value)}%`,
    he: `התקדמות גלילת עמוד: ${Math.round(progressPercentage.value)}%`
  }
  return labels[useLocalization().activeLanguage.value] || labels.en
})

// Calculate scroll progress
const calculateProgress = () => {
  let targetElement: HTMLElement | null = null

  if (typeof props.target === 'string') {
    targetElement = document.querySelector(props.target)
  } else if (props.target instanceof HTMLElement) {
    targetElement = props.target
  }

  if (targetElement) {
    // Calculate progress for specific element
    const rect = targetElement.getBoundingClientRect()
    const elementHeight = targetElement.offsetHeight
    const windowHeight = window.innerHeight

    if (rect.top <= 0) {
      const scrolled = Math.abs(rect.top)
      const maxScroll = elementHeight - windowHeight
      scrollProgress.value = (scrolled / maxScroll) * 100
    } else {
      scrollProgress.value = 0
    }
  } else {
    // Calculate progress for entire page
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = (scrollTop / scrollHeight) * 100
  }
}

// Throttled scroll handler
let scrollTimeout: number | null = null
const handleScroll = () => {
  if (scrollTimeout) {
    return
  }

  scrollTimeout = window.setTimeout(() => {
    calculateProgress()
    scrollTimeout = null
  }, 16) // ~60fps
}

// Initialize component
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  calculateProgress() // Initial calculation
})

// Cleanup
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
})
</script>

<style lang="scss" scoped>
.scroll-progress {
  position: fixed;
  z-index: 1000;

  .progress-container {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .progress-bar {
      height: 100%;
      background: v-bind(color);
      transition: width 0.1s ease;
      border-radius: inherit;
    }
  }

  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    font-weight: 600;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  // Position variants
  &.position-top {
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
  }

  &.position-bottom {
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
  }

  &.position-left {
    top: 0;
    left: 0;
    bottom: 0;
    width: 4px;
  }

  &.position-right {
    top: 0;
    right: 0;
    bottom: 0;
    width: 4px;
  }

  // Variant styles
  &.variant-thin {

    &.position-top,
    &.position-bottom {
      height: 2px;
    }

    &.position-left,
    &.position-right {
      width: 2px;
    }
  }

  &.variant-thick {

    &.position-top,
    &.position-bottom {
      height: 8px;
    }

    &.position-left,
    &.position-right {
      width: 8px;
    }
  }

  &.variant-gradient {
    .progress-container .progress-bar {
      background: linear-gradient(90deg, #007bff, #00d4ff);
    }
  }

  // Responsive design
  @media (max-width: 768px) {

    &.position-top,
    &.position-bottom {
      height: 3px;
    }

    &.position-left,
    &.position-right {
      width: 3px;
    }

    .progress-text {
      font-size: 10px;
    }
  }
}
</style>
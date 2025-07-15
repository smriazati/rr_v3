<template>
  <div class="conclusion-ending-slide">
    <div class="bg-image">
      <img src="/icons/tree.svg" alt="Tree icon" />
    </div>
    <div class="text-wrapper centered">
      <p v-if="content.title" class="h1">
        <LocalizationString :string="content.title"></LocalizationString>
      </p>
      <p class="small" v-if="content.subhead">
        <LocalizationString :string="content.subhead"></LocalizationString>
      </p>
      <nav>
        <button ref="button" class="bright full-width" v-if="content.btnText">
          <nuxt-link :to="{ path: '/', query: $route.query }">
            <LocalizationString :string="content.btnText"></LocalizationString>
          </nuxt-link>
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/**
 * ConclusionEnd Component
 * 
 * Core Functions:
 * - Displays the final conclusion slide with tree background
 * - Provides navigation back to the homepage
 * - Handles localized content for title, subtitle, and button text
 * - Creates a visually appealing ending experience
 * 
 * Performance Optimizations:
 * - Static background image for fast loading
 * - Conditional rendering to avoid unnecessary DOM elements
 * - Minimal reactivity for optimal performance
 */

// Props with TypeScript typing
interface Props {
  content: {
    title?: any
    subhead?: any
    btnText?: any
  }
}

const props = defineProps<Props>()

// Template refs
const button = ref<HTMLElement>()
</script>

<style lang="scss">
.conclusion.page .conclusion-ending-slide {
  background: #f5f5f5;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .bg-image {
    opacity: 0.3;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      filter: grayscale(1) brightness(3);
      object-fit: cover;
    }
  }

  .text-wrapper {
    position: relative;
  }

  p {
    color: $gray;
    display: flex;
    justify-content: center;

    &.small {
      @include pStyle($gray);
    }
  }

  @media (max-width: 960px) {
    padding-top: 50vh;
    padding-bottom: 60px;

    button.align-left {
      margin: 0 auto;
    }
  }
}
</style>
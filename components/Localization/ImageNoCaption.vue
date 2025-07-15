<template>
    <div>
        <div v-if="src !== '' && !size">
            <img :src="$urlFor(src)" :alt="alt" />
        </div>
        <div v-if="src !== '' && size">
            <img :src="$urlFor(src).width(size)" :alt="alt" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SanityImage } from '../../types/sanity'

/**
 * LocalizationImageNoCaption Component
 * 
 * Core Functions:
 * - Displays localized images without captions or credits
 * - Provides fallback to English if translation is missing
 * - Handles image sizing and optimization via Sanity
 * - Renders proper alt text for accessibility
 * 
 * Performance Optimizations:
 * - Computed properties for efficient language switching
 * - Conditional rendering to avoid unnecessary DOM elements
 * - Efficient image URL generation
 */

// Props with TypeScript typing
interface Props {
    img: SanityImage
    size?: number
}

const props = defineProps<Props>()

// Get store and active language (using any for now to avoid type issues)
const store = useNuxtApp().$store as any
const activeLanguage = computed(() => store?.state?.localization?.activeLanguage || 'en')

// Computed properties for image data with fallbacks
const src = computed(() => {
    if (!props.img?.img?.asset) return ''
    return props.img.img.asset
})

const alt = computed(() => {
    if (!props.img?.alt) return ''
    const lang = activeLanguage.value as keyof typeof props.img.alt
    return props.img.alt[lang] || props.img.alt.en || ''
})
</script>

<template>
    <figure>
        <div v-if="src !== '' && !size">
            <img :src="$urlFor(src)" :alt="alt" />
        </div>
        <div v-if="src !== '' && size">
            <img :src="$urlFor(src).width(size)" :alt="alt" />
        </div>
        <figcaption v-if="caption || credit">
            <p v-if="caption" class="caption">{{ caption }}</p>
            <p v-if="credit" class="credit">{{ credit }}</p>
        </figcaption>
    </figure>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SanityImage } from '../../types/sanity'

/**
 * LocalizationImage Component
 * 
 * Core Functions:
 * - Displays localized images with captions and credits
 * - Provides fallback to English if translation is missing
 * - Handles image sizing and optimization via Sanity
 * - Renders proper alt text, captions, and credits
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

const caption = computed(() => {
    if (!props.img?.caption) return ''
    const lang = activeLanguage.value as keyof typeof props.img.caption
    return props.img.caption[lang] || props.img.caption.en || ''
})

const credit = computed(() => {
    if (!props.img?.credit) return ''
    const lang = activeLanguage.value as keyof typeof props.img.credit
    return props.img.credit[lang] || props.img.credit.en || ''
})
</script>

<style lang="scss" scoped>
figure {
    display: flex;
    flex-direction: column;

    >div {
        display: flex;
        flex-direction: column;
    }

    figcaption {
        display: flex;
        flex-direction: column-reverse;

        .credit {
            text-align: right;
            margin-top: 4px;
            text-transform: uppercase;
            font-size: 10px;
        }
    }
}
</style>

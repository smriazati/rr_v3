<template>
    <div class="background-image-wrapper">
        <img v-if="imageUrl" :src="imageUrl" :alt="altText || ''" class="background-image" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLocalization } from '../../composables/useLocalization'

/**
 * BackgroundImage Component
 * 
 * Core Functions:
 * - Displays localized background images from Sanity
 * - Handles image URL generation with proper fallbacks
 * - Supports responsive image sizing
 * - Provides accessibility with alt text
 * 
 * Performance Optimizations:
 * - Computed properties for efficient image URL generation
 * - Lazy loading support for background images
 * - Optimized image sizing and quality
 */

// Props definition with TypeScript
interface Props {
    image: {
        asset?: {
            _ref?: string
        }
        alt?: string
    }
    size?: 'small' | 'medium' | 'large' | 'full'
    className?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 'full',
    className: ''
})

// Get active language from store
const { activeLanguage } = useLocalization()

// Generate image URL with proper sizing
const imageUrl = computed(() => {
    if (!props.image?.asset?._ref) return null

    const { $urlFor } = useNuxtApp()
    const baseUrl = $urlFor(props.image.asset._ref)

    // Apply size-specific transformations
    const sizeParams = {
        small: 'w=400&h=300&fit=crop',
        medium: 'w=800&h=600&fit=crop',
        large: 'w=1200&h=900&fit=crop',
        full: 'w=1920&h=1080&fit=crop'
    }

    return `${baseUrl}?${sizeParams[props.size]}`
})

// Generate localized alt text
const altText = computed(() => {
    if (props.image?.alt) {
        return props.image.alt
    }

    // Fallback alt text based on language
    const fallbackTexts: Record<string, string> = {
        en: 'Background image',
        uk: 'Фонове зображення',
        es: 'Imagen de fondo',
        he: 'תמונת רקע'
    }

    return fallbackTexts[activeLanguage.value] || fallbackTexts.en
})
</script>

<style lang="scss" scoped>
.background-image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .background-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.05);
        }
    }
}
</style>
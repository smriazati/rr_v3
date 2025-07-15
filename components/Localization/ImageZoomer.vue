<template>
    <div class="image-zoomer-wrapper" @click="toggleZoom">
        <img v-if="imageUrl" :src="imageUrl || ''" :alt="altText || ''" class="image-zoomer"
            :class="{ 'zoomed': isZoomed }" />
        <div v-if="isZoomed" class="zoom-overlay" @click="closeZoom">
            <div class="zoom-content">
                <img :src="fullImageUrl" :alt="altText || ''" class="full-image" />
                <button class="close-button" @click="closeZoom">
                    <Icon name="close" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLocalization } from '../../composables/useLocalization'

/**
 * ImageZoomer Component
 * 
 * Core Functions:
 * - Displays images with click-to-zoom functionality
 * - Handles localized image content from Sanity
 * - Provides full-screen zoom overlay
 * - Supports keyboard navigation (ESC to close)
 * 
 * Performance Optimizations:
 * - Lazy loading for full-size images
 * - Efficient event handling with proper cleanup
 * - Optimized image sizing for different zoom levels
 */

// Props definition with TypeScript
interface Props {
    image: {
        asset?: {
            _ref?: string
        }
        alt?: string
    }
    size?: 'thumbnail' | 'medium' | 'large'
    zoomLevel?: number
}

const props = withDefaults(defineProps<Props>(), {
    size: 'medium',
    zoomLevel: 2
})

// Reactive state
const isZoomed = ref(false)

// Get active language from store
const { activeLanguage } = useLocalization()

// Generate thumbnail image URL
const imageUrl = computed(() => {
    if (!props.image?.asset?._ref) return null

    const { $urlFor } = useNuxtApp()
    const baseUrl = $urlFor(props.image.asset._ref)

    // Size-specific parameters
    const sizeParams = {
        thumbnail: 'w=300&h=200&fit=crop',
        medium: 'w=600&h=400&fit=crop',
        large: 'w=800&h=600&fit=crop'
    }

    return `${baseUrl}?${sizeParams[props.size]}`
})

// Generate full-size image URL for zoom
const fullImageUrl = computed(() => {
    if (!props.image?.asset?._ref) return null

    const { $urlFor } = useNuxtApp()
    const baseUrl = $urlFor(props.image.asset._ref)

    // Full size with quality optimization
    return `${baseUrl}?w=1920&h=1080&fit=max&q=90`
})

// Generate localized alt text
const altText = computed(() => {
    if (props.image?.alt) {
        return props.image.alt
    }

    // Fallback alt text based on language
    const fallbackTexts: Record<string, string> = {
        en: 'Click to zoom image',
        uk: 'Натисніть для збільшення зображення',
        es: 'Haga clic para ampliar la imagen',
        he: 'לחץ להגדלת התמונה'
    }

    return fallbackTexts[activeLanguage.value] || fallbackTexts.en
})

// Toggle zoom state
const toggleZoom = () => {
    if (imageUrl.value) {
        isZoomed.value = !isZoomed.value
    }
}

// Close zoom overlay
const closeZoom = () => {
    isZoomed.value = false
}

// Handle keyboard events
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isZoomed.value) {
        closeZoom()
    }
}

// Add/remove keyboard listeners
onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
})
</script>

<style lang="scss" scoped>
.image-zoomer-wrapper {
    position: relative;
    cursor: pointer;

    .image-zoomer {
        width: 100%;
        height: auto;
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.02);
        }

        &.zoomed {
            transform: scale(1.05);
        }
    }

    .zoom-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;

        .zoom-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;

            .full-image {
                width: 100%;
                height: auto;
                object-fit: contain;
            }

            .close-button {
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 8px;

                &:hover {
                    opacity: 0.8;
                }
            }
        }
    }
}
</style>
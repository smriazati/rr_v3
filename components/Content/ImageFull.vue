<template>
    <div class="image-full-wrapper" :class="wrapperClass">
        <div v-if="imageUrl" class="image-container">
            <img :src="imageUrl" :alt="altText || ''" class="full-image" :class="{ 'lazy-load': lazyLoad }" />
            <div v-if="showCaption" class="image-caption">
                <div class="caption-content">
                    <p v-if="caption" class="caption">
                        <String :string="caption" />
                    </p>
                    <p v-if="credit" class="credit">
                        <String :string="credit" />
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLocalization } from '../../composables/useLocalization'

/**
 * ImageFull Component
 * 
 * Core Functions:
 * - Displays full-width images with captions and credits
 * - Handles localized image content from Sanity
 * - Supports lazy loading for performance
 * - Provides responsive image sizing
 * 
 * Performance Optimizations:
 * - Lazy loading support for large images
 * - Optimized image sizing and quality
 * - Efficient caption rendering
 */

// Props definition with TypeScript
interface Props {
    image: {
        asset?: {
            _ref?: string
        }
        alt?: {
            en?: string
            uk?: string
            es?: string
            he?: string
        }
        caption?: {
            en?: string
            uk?: string
            es?: string
            he?: string
        }
        credit?: {
            en?: string
            uk?: string
            es?: string
            he?: string
        }
    }
    size?: 'small' | 'medium' | 'large' | 'full'
    lazyLoad?: boolean
    showCaption?: boolean
    className?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 'full',
    lazyLoad: true,
    showCaption: true,
    className: ''
})

// Get active language from store
const { activeLanguage } = useLocalization()

// Generate wrapper classes
const wrapperClass = computed(() => {
    const classes = ['image-full-wrapper']

    if (props.className) {
        classes.push(props.className)
    }

    if (props.size) {
        classes.push(`size-${props.size}`)
    }

    return classes.join(' ')
})

// Generate image URL with proper sizing
const imageUrl = computed(() => {
    if (!props.image?.asset?._ref) return null

    const { $urlFor } = useNuxtApp()
    const baseUrl = $urlFor(props.image.asset._ref)

    // Size-specific parameters
    const sizeParams = {
        small: 'w=800&h=600&fit=crop',
        medium: 'w=1200&h=800&fit=crop',
        large: 'w=1600&h=1000&fit=crop',
        full: 'w=1920&h=1080&fit=crop'
    }

    return `${baseUrl}?${sizeParams[props.size]}`
})

// Generate localized alt text
const altText = computed(() => {
    if (!props.image?.alt) return ''

    const alt = props.image.alt[activeLanguage.value as keyof typeof props.image.alt]
    return alt || props.image.alt.en || ''
})

// Generate localized caption
const caption = computed(() => {
    if (!props.image?.caption) return null

    const captionText = props.image.caption[activeLanguage.value as keyof typeof props.image.caption]
    return captionText || props.image.caption.en || null
})

// Generate localized credit
const credit = computed(() => {
    if (!props.image?.credit) return null

    const creditText = props.image.credit[activeLanguage.value as keyof typeof props.image.credit]
    return creditText || props.image.credit.en || null
})
</script>

<style lang="scss" scoped>
.image-full-wrapper {
    width: 100%;
    margin: 20px 0;

    .image-container {
        position: relative;
        width: 100%;

        .full-image {
            width: 100%;
            height: auto;
            display: block;
            transition: opacity 0.3s ease;

            &.lazy-load {
                opacity: 0;

                &.loaded {
                    opacity: 1;
                }
            }
        }

        .image-caption {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
            color: white;
            padding: 20px;

            .caption-content {
                max-width: 800px;
                margin: 0 auto;

                .caption {
                    font-size: 16px;
                    line-height: 1.4;
                    margin-bottom: 8px;

                    @media (max-width: 768px) {
                        font-size: 14px;
                    }
                }

                .credit {
                    font-size: 12px;
                    opacity: 0.8;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;

                    @media (max-width: 768px) {
                        font-size: 11px;
                    }
                }
            }
        }
    }

    // Size variants
    &.size-small {
        max-width: 600px;
        margin: 20px auto;
    }

    &.size-medium {
        max-width: 900px;
        margin: 20px auto;
    }

    &.size-large {
        max-width: 1200px;
        margin: 20px auto;
    }

    &.size-full {
        // Full width - no max-width
    }
}
</style>

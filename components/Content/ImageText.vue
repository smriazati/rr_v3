<template>
    <div class="image-text-wrapper" :class="wrapperClass">
        <div class="content-grid">
            <div v-if="imageUrl" class="image-section">
                <img :src="imageUrl" :alt="altText || ''" class="content-image" :class="{ 'lazy-load': lazyLoad }" />
                <div v-if="showCaption" class="image-caption">
                    <p v-if="caption" class="caption">
                        <String :string="caption" />
                    </p>
                    <p v-if="credit" class="credit">
                        <String :string="credit" />
                    </p>
                </div>
            </div>
            <div v-if="textContent" class="text-section">
                <div v-if="title" class="title">
                    <String :string="title" />
                </div>
                <div v-if="content" class="content">
                    <Rte :rte="content" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLocalization } from '../../composables/useLocalization'

/**
 * ImageText Component
 * 
 * Core Functions:
 * - Displays image and text content side by side
 * - Handles localized content from Sanity
 * - Supports different layout orientations
 * - Provides responsive grid layout
 * 
 * Performance Optimizations:
 * - Efficient grid layout with CSS Grid
 * - Lazy loading for images
 * - Optimized content rendering
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
    title?: {
        en?: string
        uk?: string
        es?: string
        he?: string
    }
    content?: {
        en?: any[]
        uk?: any[]
        es?: any[]
        he?: any[]
    }
    layout?: 'image-left' | 'image-right' | 'image-top' | 'image-bottom'
    imageSize?: 'small' | 'medium' | 'large'
    lazyLoad?: boolean
    showCaption?: boolean
    className?: string
}

const props = withDefaults(defineProps<Props>(), {
    layout: 'image-left',
    imageSize: 'medium',
    lazyLoad: true,
    showCaption: true,
    className: ''
})

// Get active language from store
const { activeLanguage } = useLocalization()

// Generate wrapper classes
const wrapperClass = computed(() => {
    const classes = ['image-text-wrapper']

    if (props.className) {
        classes.push(props.className)
    }

    if (props.layout) {
        classes.push(`layout-${props.layout}`)
    }

    if (props.imageSize) {
        classes.push(`image-${props.imageSize}`)
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
        small: 'w=400&h=300&fit=crop',
        medium: 'w=600&h=450&fit=crop',
        large: 'w=800&h=600&fit=crop'
    }

    return `${baseUrl}?${sizeParams[props.imageSize]}`
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

// Check if text content exists
const textContent = computed(() => {
    return props.title || props.content
})
</script>

<style lang="scss" scoped>
.image-text-wrapper {
    width: 100%;
    margin: 30px 0;

    .content-grid {
        display: grid;
        gap: 30px;
        align-items: start;

        .image-section {
            .content-image {
                width: 100%;
                height: auto;
                display: block;
                border-radius: 8px;
                transition: opacity 0.3s ease;

                &.lazy-load {
                    opacity: 0;

                    &.loaded {
                        opacity: 1;
                    }
                }
            }

            .image-caption {
                margin-top: 12px;

                .caption {
                    font-size: 14px;
                    line-height: 1.4;
                    color: #666;
                    margin-bottom: 4px;
                }

                .credit {
                    font-size: 12px;
                    color: #999;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
            }
        }

        .text-section {
            .title {
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 16px;
                line-height: 1.3;

                @media (max-width: 768px) {
                    font-size: 20px;
                }
            }

            .content {
                font-size: 16px;
                line-height: 1.6;
                color: #333;

                :deep(p) {
                    margin-bottom: 16px;

                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }

    // Layout variants
    &.layout-image-left {
        .content-grid {
            grid-template-columns: 1fr 1fr;

            @media (max-width: 768px) {
                grid-template-columns: 1fr;
            }
        }
    }

    &.layout-image-right {
        .content-grid {
            grid-template-columns: 1fr 1fr;

            @media (max-width: 768px) {
                grid-template-columns: 1fr;
            }

            .image-section {
                order: 2;
            }

            .text-section {
                order: 1;
            }
        }
    }

    &.layout-image-top {
        .content-grid {
            grid-template-columns: 1fr;
        }
    }

    &.layout-image-bottom {
        .content-grid {
            grid-template-columns: 1fr;

            .image-section {
                order: 2;
            }

            .text-section {
                order: 1;
            }
        }
    }

    // Image size variants
    &.image-small .image-section .content-image {
        max-width: 300px;
    }

    &.image-medium .image-section .content-image {
        max-width: 500px;
    }

    &.image-large .image-section .content-image {
        max-width: 700px;
    }
}
</style>
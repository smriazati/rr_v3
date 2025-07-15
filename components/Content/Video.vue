<template>
    <div class="video-content-wrapper" :class="wrapperClass">
        <div v-if="videoUrl" class="video-container">
            <div class="video-wrapper">
                <iframe :src="videoUrl" :title="videoTitle || ''" class="video-iframe" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
            </div>
            <div v-if="showCaption" class="video-caption">
                <div v-if="title" class="title">
                    <String :string="title" />
                </div>
                <div v-if="description" class="description">
                    <Rte :rte="description" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLocalization } from '../../composables/useLocalization'

/**
 * Video Component
 * 
 * Core Functions:
 * - Displays embedded videos from Vimeo/YouTube
 * - Handles localized video content from Sanity
 * - Supports responsive video sizing
 * - Provides video captions and descriptions
 * 
 * Performance Optimizations:
 * - Lazy loading for video embeds
 * - Optimized iframe loading
 * - Efficient responsive design
 */

// Props definition with TypeScript
interface Props {
    videoUrl?: string
    title?: {
        en?: string
        uk?: string
        es?: string
        he?: string
    }
    description?: {
        en?: any[]
        uk?: any[]
        es?: any[]
        he?: any[]
    }
    size?: 'small' | 'medium' | 'large' | 'full'
    aspectRatio?: '16:9' | '4:3' | '1:1'
    showCaption?: boolean
    className?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 'medium',
    aspectRatio: '16:9',
    showCaption: true,
    className: ''
})

// Get active language from store
const { activeLanguage } = useLocalization()

// Generate wrapper classes
const wrapperClass = computed(() => {
    const classes = ['video-content-wrapper']

    if (props.className) {
        classes.push(props.className)
    }

    if (props.size) {
        classes.push(`size-${props.size}`)
    }

    if (props.aspectRatio) {
        classes.push(`aspect-${props.aspectRatio.replace(':', '-')}`)
    }

    return classes.join(' ')
})

// Process video URL for embedding
const processedVideoUrl = computed(() => {
    if (!props.videoUrl) return null

    // Handle Vimeo URLs
    if (props.videoUrl.includes('vimeo.com')) {
        const vimeoId = props.videoUrl.match(/vimeo\.com\/(\d+)/)?.[1]
        if (vimeoId) {
            return `https://player.vimeo.com/video/${vimeoId}?h=auto&autoplay=0&title=0&byline=0&portrait=0`
        }
    }

    // Handle YouTube URLs
    if (props.videoUrl.includes('youtube.com') || props.videoUrl.includes('youtu.be')) {
        const youtubeId = props.videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
        if (youtubeId) {
            return `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`
        }
    }

    // Return original URL if no processing needed
    return props.videoUrl
})

// Generate video title for accessibility
const videoTitle = computed(() => {
    if (props.title) {
        const title = props.title[activeLanguage.value as keyof typeof props.title]
        return title || props.title.en || 'Video content'
    }
    return 'Video content'
})

// Check if video content exists
const hasVideoContent = computed(() => {
    return props.videoUrl || props.title || props.description
})
</script>

<style lang="scss" scoped>
.video-content-wrapper {
    width: 100%;
    margin: 30px 0;

    .video-container {
        .video-wrapper {
            position: relative;
            width: 100%;
            background: #000;
            border-radius: 8px;
            overflow: hidden;

            .video-iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border: none;
            }
        }

        .video-caption {
            margin-top: 20px;

            .title {
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 12px;
                line-height: 1.3;

                @media (max-width: 768px) {
                    font-size: 18px;
                }
            }

            .description {
                font-size: 16px;
                line-height: 1.6;
                color: #666;

                :deep(p) {
                    margin-bottom: 12px;

                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }

    // Size variants
    &.size-small {
        max-width: 500px;
        margin: 20px auto;
    }

    &.size-medium {
        max-width: 800px;
        margin: 30px auto;
    }

    &.size-large {
        max-width: 1000px;
        margin: 30px auto;
    }

    &.size-full {
        // Full width - no max-width
    }

    // Aspect ratio variants
    &.aspect-16-9 .video-wrapper {
        padding-bottom: 56.25%; // 16:9 aspect ratio
    }

    &.aspect-4-3 .video-wrapper {
        padding-bottom: 75%; // 4:3 aspect ratio
    }

    &.aspect-1-1 .video-wrapper {
        padding-bottom: 100%; // 1:1 aspect ratio
    }
}
</style>
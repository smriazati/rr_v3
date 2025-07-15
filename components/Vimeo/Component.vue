<template>
  <div class="vimeo-component" :class="componentClass">
    <div class="vimeo-container">
      <div v-if="!isPlaying" class="vimeo-preview" @click="playVideo">
        <img v-if="thumbnailUrl" :src="thumbnailUrl" :alt="videoTitle || ''" class="preview-image" />
        <div class="play-overlay">
          <button class="play-button" :aria-label="playLabel">
            <Icon name="play" />
          </button>
        </div>
        <div v-if="showCaption" class="video-caption">
          <div class="caption-content">
            <h3 v-if="videoTitle" class="video-title">
              <String :string="videoTitle" />
            </h3>
            <div v-if="videoDescription" class="video-description">
              <Rte :rte="videoDescription" />
            </div>
          </div>
        </div>
      </div>

      <div v-else class="vimeo-player">
        <iframe :src="embedUrl" :title="videoTitle || 'Video player'" class="vimeo-iframe" frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture" allowfullscreen @load="onPlayerLoad"></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * Vimeo Component
 * 
 * Core Functions:
 * - Displays Vimeo videos with custom controls
 * - Handles video playback and state management
 * - Provides thumbnail preview and play overlay
 * - Supports localized video content
 * 
 * Performance Optimizations:
 * - Lazy loading for video embeds
 * - Efficient thumbnail handling
 * - Optimized player initialization
 */

// Props definition with TypeScript
interface Props {
  videoId?: string
  videoUrl?: string
  videoTitle?: {
    en?: string
    uk?: string
    es?: string
    he?: string
  }
  videoDescription?: {
    en?: any[]
    uk?: any[]
    es?: any[]
    he?: any[]
  }
  thumbnailUrl?: string
  autoplay?: boolean
  showCaption?: boolean
  size?: 'small' | 'medium' | 'large' | 'full'
  aspectRatio?: '16:9' | '4:3' | '1:1'
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: false,
  showCaption: true,
  size: 'medium',
  aspectRatio: '16:9',
  className: ''
})

// Emits definition
const emit = defineEmits<{
  'play': [videoId: string]
  'pause': [videoId: string]
  'end': [videoId: string]
  'load': [videoId: string]
}>()

// Reactive state
const isPlaying = ref(props.autoplay)
const isLoaded = ref(false)

// Computed properties
const componentClass = computed(() => {
  const classes = ['vimeo-component']

  if (props.className) {
    classes.push(props.className)
  }

  if (props.size) {
    classes.push(`size-${props.size}`)
  }

  if (props.aspectRatio) {
    classes.push(`aspect-${props.aspectRatio.replace(':', '-')}`)
  }

  if (isPlaying.value) {
    classes.push('playing')
  }

  return classes.join(' ')
})

const videoId = computed(() => {
  if (props.videoId) {
    return props.videoId
  }

  if (props.videoUrl) {
    const match = props.videoUrl.match(/vimeo\.com\/(\d+)/)
    return match ? match[1] : null
  }

  return null
})

const embedUrl = computed(() => {
  if (!videoId.value) return null

  const baseUrl = `https://player.vimeo.com/video/${videoId.value}`
  const params = new URLSearchParams({
    h: 'auto',
    autoplay: isPlaying.value ? '1' : '0',
    title: '0',
    byline: '0',
    portrait: '0',
    controls: '1'
  })

  return `${baseUrl}?${params.toString()}`
})

// Localized labels
const playLabel = computed(() => {
  const labels: Record<string, string> = {
    en: 'Play video',
    uk: 'Відтворити відео',
    es: 'Reproducir video',
    he: 'הפעל וידאו'
  }
  return labels[useLocalization().activeLanguage.value] || labels.en
})

// Event handlers
const playVideo = () => {
  if (videoId.value) {
    isPlaying.value = true
    emit('play', videoId.value)
  }
}

const onPlayerLoad = () => {
  isLoaded.value = true
  if (videoId.value) {
    emit('load', videoId.value)
  }
}

// Handle keyboard events
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isPlaying.value) {
    isPlaying.value = false
    if (videoId.value) {
      emit('pause', videoId.value)
    }
  }
}

// Initialize component
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

// Cleanup
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style lang="scss" scoped>
.vimeo-component {
  width: 100%;
  margin: 20px 0;

  .vimeo-container {
    position: relative;
    width: 100%;
    background: #000;
    border-radius: 8px;
    overflow: hidden;

    .vimeo-preview {
      position: relative;
      cursor: pointer;

      .preview-image {
        width: 100%;
        height: auto;
        display: block;
        transition: opacity 0.3s ease;
      }

      .play-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease;

        &:hover {
          background: rgba(0, 0, 0, 0.5);
        }

        .play-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 32px;
          color: #333;

          &:hover {
            background: white;
            transform: scale(1.1);
          }
        }
      }

      .video-caption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
        color: white;
        padding: 20px;

        .caption-content {
          .video-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;

            @media (max-width: 768px) {
              font-size: 16px;
            }
          }

          .video-description {
            font-size: 14px;
            line-height: 1.4;
            opacity: 0.9;

            @media (max-width: 768px) {
              font-size: 13px;
            }
          }
        }
      }
    }

    .vimeo-player {
      position: relative;
      width: 100%;

      .vimeo-iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
      }
    }
  }

  // Size variants
  &.size-small {
    max-width: 400px;
    margin: 20px auto;
  }

  &.size-medium {
    max-width: 600px;
    margin: 20px auto;
  }

  &.size-large {
    max-width: 800px;
    margin: 20px auto;
  }

  &.size-full {
    // Full width - no max-width
  }

  // Aspect ratio variants
  &.aspect-16-9 .vimeo-container {
    padding-bottom: 56.25%; // 16:9 aspect ratio
  }

  &.aspect-4-3 .vimeo-container {
    padding-bottom: 75%; // 4:3 aspect ratio
  }

  &.aspect-1-1 .vimeo-container {
    padding-bottom: 100%; // 1:1 aspect ratio
  }

  // Responsive design
  @media (max-width: 768px) {
    margin: 15px 0;

    .vimeo-container {
      .vimeo-preview {
        .play-overlay .play-button {
          width: 60px;
          height: 60px;
          font-size: 24px;
        }

        .video-caption {
          padding: 15px;
        }
      }
    }
  }
}
</style>

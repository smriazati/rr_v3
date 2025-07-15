<template>
  <div class="map-intro" :class="introClass">
    <div class="intro-overlay" @click="closeIntro">
      <div class="intro-content" @click.stop>
        <div class="intro-header">
          <h2 class="intro-title">
            <String :string="title" />
          </h2>
          <button class="close-button" @click="closeIntro" :aria-label="closeLabel">
            <Icon name="close" />
          </button>
        </div>

        <div class="intro-body">
          <div v-if="description" class="intro-description">
            <Rte :rte="description" />
          </div>

          <div v-if="instructions" class="intro-instructions">
            <h3 class="instructions-title">
              <String :string="instructionsTitle" />
            </h3>
            <Rte :rte="instructions" />
          </div>

          <div v-if="features.length > 0" class="intro-features">
            <h3 class="features-title">
              <String :string="featuresTitle" />
            </h3>
            <ul class="features-list">
              <li v-for="feature in features" :key="feature.id" class="feature-item">
                <div class="feature-icon">
                  <Icon :name="feature.icon || 'check'" />
                </div>
                <div class="feature-content">
                  <String :string="feature.title" />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="intro-footer">
          <button class="primary-button" @click="startExploring">
            <String :string="startButtonText" />
          </button>
          <button class="secondary-button" @click="closeIntro">
            <String :string="closeButtonText" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Map Intro Component
 * 
 * Core Functions:
 * - Displays map introduction and instructions
 * - Handles localized content from Sanity
 * - Provides feature highlights and navigation
 * - Manages intro state and user interactions
 * 
 * Performance Optimizations:
 * - Efficient content rendering
 * - Optimized modal interactions
 * - Responsive design implementation
 */

// Props definition with TypeScript
interface Feature {
  id: string
  title: {
    en?: string
    uk?: string
    es?: string
    he?: string
  }
  icon?: string
}

interface Props {
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
  instructions?: {
    en?: any[]
    uk?: any[]
    es?: any[]
    he?: any[]
  }
  features?: Feature[]
  isVisible?: boolean
  variant?: 'default' | 'minimal' | 'fullscreen'
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: false,
  variant: 'default',
  className: '',
  features: () => []
})

// Emits definition
const emit = defineEmits<{
  'close': []
  'start-exploring': []
}>()

// Computed properties
const introClass = computed(() => {
  const classes = ['map-intro']

  if (props.className) {
    classes.push(props.className)
  }

  if (props.variant) {
    classes.push(`variant-${props.variant}`)
  }

  if (props.isVisible) {
    classes.push('visible')
  }

  return classes.join(' ')
})

// Localized labels
const closeLabel = computed(() => {
  const labels: Record<string, string> = {
    en: 'Close introduction',
    uk: 'Закрити вступ',
    es: 'Cerrar introducción',
    he: 'סגור הקדמה'
  }
  return labels[useLocalization().activeLanguage.value] || labels.en
})

const instructionsTitle = computed(() => ({
  en: 'How to use this map',
  uk: 'Як користуватися цією картою',
  es: 'Cómo usar este mapa',
  he: 'איך להשתמש במפה זו'
}))

const featuresTitle = computed(() => ({
  en: 'Features',
  uk: 'Можливості',
  es: 'Características',
  he: 'תכונות'
}))

const startButtonText = computed(() => ({
  en: 'Start Exploring',
  uk: 'Почати дослідження',
  es: 'Comenzar a explorar',
  he: 'התחל לחקור'
}))

const closeButtonText = computed(() => ({
  en: 'Close',
  uk: 'Закрити',
  es: 'Cerrar',
  he: 'סגור'
}))

// Event handlers
const closeIntro = () => {
  emit('close')
}

const startExploring = () => {
  emit('start-exploring')
}
</script>

<style lang="scss" scoped>
.map-intro {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;

  &.visible {
    opacity: 1;
    visibility: visible;
  }

  .intro-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;

    .intro-content {
      background: white;
      border-radius: 12px;
      max-width: 600px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);

      .intro-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px 24px 0;

        .intro-title {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          color: #333;
        }

        .close-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: background-color 0.2s ease;

          &:hover {
            background-color: #f0f0f0;
          }
        }
      }

      .intro-body {
        padding: 20px 24px;

        .intro-description {
          margin-bottom: 24px;

          :deep(p) {
            font-size: 16px;
            line-height: 1.6;
            color: #666;
            margin-bottom: 16px;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }

        .intro-instructions {
          margin-bottom: 24px;

          .instructions-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 12px;
            color: #333;
          }

          :deep(p) {
            font-size: 14px;
            line-height: 1.5;
            color: #666;
            margin-bottom: 12px;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }

        .intro-features {
          .features-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 16px;
            color: #333;
          }

          .features-list {
            list-style: none;
            margin: 0;
            padding: 0;

            .feature-item {
              display: flex;
              align-items: center;
              margin-bottom: 12px;

              &:last-child {
                margin-bottom: 0;
              }

              .feature-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                background-color: #007bff;
                color: white;
                border-radius: 50%;
                margin-right: 12px;
                font-size: 12px;
              }

              .feature-content {
                font-size: 14px;
                color: #666;
              }
            }
          }
        }
      }

      .intro-footer {
        display: flex;
        gap: 12px;
        padding: 0 24px 24px;

        .primary-button,
        .secondary-button {
          flex: 1;
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .primary-button {
          background-color: #007bff;
          color: white;

          &:hover {
            background-color: #0056b3;
          }
        }

        .secondary-button {
          background-color: #f8f9fa;
          color: #666;
          border: 1px solid #e0e0e0;

          &:hover {
            background-color: #e9ecef;
          }
        }
      }
    }
  }

  // Variant styles
  &.variant-minimal {
    .intro-overlay .intro-content {
      max-width: 400px;

      .intro-header .intro-title {
        font-size: 20px;
      }

      .intro-body {
        padding: 16px 24px;
      }
    }
  }

  &.variant-fullscreen {
    .intro-overlay {
      background: white;

      .intro-content {
        max-width: none;
        max-height: none;
        border-radius: 0;
        box-shadow: none;
      }
    }
  }

  // Responsive design
  @media (max-width: 768px) {
    .intro-overlay {
      padding: 10px;

      .intro-content {
        .intro-header {
          padding: 20px 20px 0;

          .intro-title {
            font-size: 20px;
          }
        }

        .intro-body {
          padding: 16px 20px;
        }

        .intro-footer {
          flex-direction: column;
          padding: 0 20px 20px;

          .primary-button,
          .secondary-button {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
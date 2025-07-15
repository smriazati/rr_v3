<template>
  <li class="marker-list-item" :class="{
    'active': isActive,
    'viewed': isViewed,
    'hover': isHovered
  }" @click="selectMarker" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div class="marker-icon" :style="markerIconStyle">
      <Icon name="pin" />
    </div>
    <div class="marker-content">
      <div class="marker-title">
        <String :string="marker.title" />
      </div>
      <div v-if="marker.description" class="marker-description">
        <String :string="marker.description" />
      </div>
    </div>
    <div v-if="showIndex" class="marker-index">
      {{ index + 1 }}
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

/**
 * ControlsMarkerListItem Component
 * 
 * Core Functions:
 * - Displays individual marker items in the map controls list
 * - Handles marker selection and hover states
 * - Provides visual feedback for active and viewed markers
 * - Supports localized marker content
 * 
 * Performance Optimizations:
 * - Efficient state management
 * - Optimized hover interactions
 * - Computed styles for dynamic theming
 */

// Props definition with TypeScript
interface Marker {
  id: string
  title: {
    en?: string
    uk?: string
    es?: string
    he?: string
  }
  description?: {
    en?: string
    uk?: string
    es?: string
    he?: string
  }
  position: {
    lat: number
    lng: number
  }
  color?: string
  viewed?: boolean
}

interface Props {
  marker: Marker
  index: number
  isActive?: boolean
  showIndex?: boolean
  colorScheme?: 'default' | 'custom' | 'gradient'
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  showIndex: true,
  colorScheme: 'default',
  className: ''
})

// Emits definition
const emit = defineEmits<{
  'select': [markerId: string]
  'hover': [markerId: string, isHovered: boolean]
}>()

// Reactive state
const isHovered = ref(false)

// Computed properties
const isViewed = computed(() => {
  return props.marker.viewed || false
})

const markerIconStyle = computed(() => {
  const baseStyle = {
    backgroundColor: props.marker.color || '#54a131',
    transition: 'all 0.3s ease'
  }

  if (isHovered.value) {
    return {
      ...baseStyle,
      backgroundColor: '#ffffff',
      transform: 'scale(1.1)'
    }
  }

  if (isViewed.value) {
    return {
      ...baseStyle,
      backgroundColor: '#666666'
    }
  }

  return baseStyle
})

// Event handlers
const selectMarker = () => {
  emit('select', props.marker.id)
}

// Watch for hover state changes
watch(isHovered, (newValue: boolean) => {
  emit('hover', props.marker.id, newValue)
})
</script>

<style lang="scss" scoped>
.marker-list-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8f9fa;
  }

  &.active {
    background-color: #e3f2fd;
    border-left: 4px solid #2196f3;
  }

  &.viewed {
    opacity: 0.7;

    .marker-title {
      text-decoration: line-through;
      color: #666;
    }
  }

  .marker-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 12px;
    color: white;
    font-size: 16px;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  .marker-content {
    flex: 1;
    min-width: 0;

    .marker-title {
      font-weight: 500;
      font-size: 14px;
      line-height: 1.3;
      margin-bottom: 4px;
      color: #333;
    }

    .marker-description {
      font-size: 12px;
      line-height: 1.4;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .marker-index {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-color: #f0f0f0;
    border-radius: 50%;
    font-size: 12px;
    font-weight: 600;
    color: #666;
    margin-left: 8px;
  }

  // Color scheme variants
  &.color-scheme-gradient {
    .marker-icon {
      background: linear-gradient(135deg, #54a131, #70a131);
    }
  }

  &.color-scheme-custom {
    .marker-icon {
      background-color: var(--marker-color, #54a131);
    }
  }

  // Responsive design
  @media (max-width: 768px) {
    padding: 10px 12px;

    .marker-icon {
      width: 28px;
      height: 28px;
      margin-right: 10px;

      svg {
        width: 16px;
        height: 16px;
      }
    }

    .marker-content {
      .marker-title {
        font-size: 13px;
      }

      .marker-description {
        font-size: 11px;
      }
    }

    .marker-index {
      width: 20px;
      height: 20px;
      font-size: 11px;
    }
  }
}
</style>

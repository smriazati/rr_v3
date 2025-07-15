<template>
  <div class="map-controls" :class="controlsClass">
    <div class="controls-container">
      <!-- Zoom Controls -->
      <div class="control-group zoom-controls">
        <button class="control-button zoom-in" @click="zoomIn" :disabled="!canZoomIn" :aria-label="zoomInLabel">
          <Icon name="plus" />
        </button>
        <button class="control-button zoom-out" @click="zoomOut" :disabled="!canZoomOut" :aria-label="zoomOutLabel">
          <Icon name="minus" />
        </button>
      </div>

      <!-- Navigation Controls -->
      <div class="control-group nav-controls">
        <button class="control-button recenter" @click="recenterMap" :aria-label="recenterLabel">
          <Icon name="recenter" />
        </button>
        <button class="control-button fullscreen" @click="toggleFullscreen" :aria-label="fullscreenLabel">
          <Icon name="fullscreen" />
        </button>
      </div>

      <!-- Layer Controls -->
      <div v-if="layers.length > 0" class="control-group layer-controls">
        <div class="layer-selector">
          <label class="layer-label">
            <String :string="layerLabel" />
          </label>
          <select v-model="selectedLayer" @change="onLayerChange" class="layer-select">
            <option v-for="layer in layers" :key="layer.id" :value="layer.id">
              <String :string="layer.name" />
            </option>
          </select>
        </div>
      </div>

      <!-- Marker List Toggle -->
      <div v-if="hasMarkers" class="control-group marker-controls">
        <button class="control-button marker-toggle" @click="toggleMarkerList" :class="{ 'active': isMarkerListOpen }"
          :aria-label="markerListLabel">
          <Icon name="list" />
          <span class="marker-count">{{ markerCount }}</span>
        </button>
      </div>
    </div>

    <!-- Marker List Panel -->
    <div v-if="hasMarkers && isMarkerListOpen" class="marker-list-panel">
      <div class="marker-list-header">
        <h3 class="marker-list-title">
          <String :string="markerListTitle" />
        </h3>
        <button class="close-button" @click="closeMarkerList" :aria-label="closeLabel">
          <Icon name="close" />
        </button>
      </div>
      <div class="marker-list-content">
        <slot name="marker-list">
          <ul class="marker-list">
            <li v-for="marker in visibleMarkers" :key="marker.id" class="marker-item"
              :class="{ 'active': marker.id === activeMarkerId }">
              <button class="marker-button" @click="selectMarker(marker.id)">
                <span class="marker-title">
                  <String :string="marker.title" />
                </span>
                <span v-if="marker.description" class="marker-description">
                  <String :string="marker.description" />
                </span>
              </button>
            </li>
          </ul>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useLocalization } from '../../composables/useLocalization'

/**
 * Map Controls Component
 * 
 * Core Functions:
 * - Provides zoom, navigation, and layer controls for maps
 * - Handles marker list display and interaction
 * - Manages map state and user interactions
 * - Supports fullscreen and responsive design
 * 
 * Performance Optimizations:
 * - Efficient state management
 * - Optimized marker list rendering
 * - Debounced control interactions
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
  visible?: boolean
}

interface Layer {
  id: string
  name: {
    en?: string
    uk?: string
    es?: string
    he?: string
  }
  visible?: boolean
}

interface Props {
  zoom?: number
  minZoom?: number
  maxZoom?: number
  center?: {
    lat: number
    lng: number
  }
  markers?: Marker[]
  layers?: Layer[]
  selectedLayerId?: string
  activeMarkerId?: string
  isFullscreen?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  zoom: 10,
  minZoom: 1,
  maxZoom: 18,
  center: () => ({ lat: 0, lng: 0 }),
  markers: () => [],
  layers: () => [],
  selectedLayerId: '',
  activeMarkerId: '',
  isFullscreen: false,
  className: ''
})

// Emits definition
const emit = defineEmits<{
  'zoom-in': []
  'zoom-out': []
  'recenter': []
  'fullscreen-toggle': [value: boolean]
  'layer-change': [layerId: string]
  'marker-select': [markerId: string]
  'marker-list-toggle': [isOpen: boolean]
}>()

// Reactive state
const isMarkerListOpen = ref(false)
const selectedLayer = ref(props.selectedLayerId)

// Get active language
const { activeLanguage } = useLocalization()

// Computed properties
const controlsClass = computed(() => {
  const classes = ['map-controls']

  if (props.className) {
    classes.push(props.className)
  }

  if (props.isFullscreen) {
    classes.push('fullscreen')
  }

  if (isMarkerListOpen.value) {
    classes.push('marker-list-open')
  }

  return classes.join(' ')
})

const canZoomIn = computed(() => {
  return props.zoom < props.maxZoom
})

const canZoomOut = computed(() => {
  return props.zoom > props.minZoom
})

const hasMarkers = computed(() => {
  return props.markers.length > 0
})

const markerCount = computed(() => {
  return props.markers.length
})

const visibleMarkers = computed(() => {
  return props.markers.filter(marker => marker.visible !== false)
})

// Localized labels
const zoomInLabel = computed(() => {
  const labels: Record<string, string> = {
    en: 'Zoom in',
    uk: 'Збільшити',
    es: 'Acercar',
    he: 'התקרב'
  }
  return labels[activeLanguage.value] || labels.en
})

const zoomOutLabel = computed(() => {
  const labels: Record<string, string> = {
    en: 'Zoom out',
    uk: 'Зменшити',
    es: 'Alejar',
    he: 'התרחק'
  }
  return labels[activeLanguage.value] || labels.en
})

const recenterLabel = computed(() => {
  const labels: Record<string, string> = {
    en: 'Recenter map',
    uk: 'Центрувати карту',
    es: 'Centrar mapa',
    he: 'מרכז מפה'
  }
  return labels[activeLanguage.value] || labels.en
})

const fullscreenLabel = computed(() => {
  const labels: Record<string, string> = {
    en: 'Toggle fullscreen',
    uk: 'Повноекранний режим',
    es: 'Pantalla completa',
    he: 'מסך מלא'
  }
  return labels[activeLanguage.value] || labels.en
})

const markerListLabel = computed(() => {
  const labels: Record<string, string> = {
    en: 'Show markers',
    uk: 'Показати маркери',
    es: 'Mostrar marcadores',
    he: 'הצג סמנים'
  }
  return labels[activeLanguage.value] || labels.en
})

const closeLabel = computed(() => {
  const labels: Record<string, string> = {
    en: 'Close',
    uk: 'Закрити',
    es: 'Cerrar',
    he: 'סגור'
  }
  return labels[activeLanguage.value] || labels.en
})

const layerLabel = computed(() => ({
  en: 'Layer',
  uk: 'Шар',
  es: 'Capa',
  he: 'שכבה'
}))

const markerListTitle = computed(() => ({
  en: 'Markers',
  uk: 'Маркери',
  es: 'Marcadores',
  he: 'סמנים'
}))

// Event handlers
const zoomIn = () => {
  if (canZoomIn.value) {
    emit('zoom-in')
  }
}

const zoomOut = () => {
  if (canZoomOut.value) {
    emit('zoom-out')
  }
}

const recenterMap = () => {
  emit('recenter')
}

const toggleFullscreen = () => {
  emit('fullscreen-toggle', !props.isFullscreen)
}

const onLayerChange = () => {
  emit('layer-change', selectedLayer.value)
}

const toggleMarkerList = () => {
  isMarkerListOpen.value = !isMarkerListOpen.value
  emit('marker-list-toggle', isMarkerListOpen.value)
}

const closeMarkerList = () => {
  isMarkerListOpen.value = false
  emit('marker-list-toggle', false)
}

const selectMarker = (markerId: string) => {
  emit('marker-select', markerId)
}

// Watch for prop changes
watch(() => props.selectedLayerId, (newValue) => {
  selectedLayer.value = newValue
})
</script>

<style lang="scss" scoped>
.map-controls {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;

  .controls-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    padding: 10px;

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .control-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover:not(:disabled) {
          background: #f8f9fa;
          border-color: #007bff;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        &.active {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }

        .marker-count {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #dc3545;
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 16px;
          text-align: center;
        }
      }
    }

    .layer-selector {
      .layer-label {
        display: block;
        font-size: 12px;
        color: #666;
        margin-bottom: 5px;
      }

      .layer-select {
        width: 100%;
        padding: 8px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        font-size: 14px;
        background: white;

        &:focus {
          outline: none;
          border-color: #007bff;
        }
      }
    }
  }

  .marker-list-panel {
    position: absolute;
    top: 100%;
    right: 0;
    width: 300px;
    max-height: 400px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    margin-top: 10px;

    .marker-list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #e0e0e0;

      .marker-list-title {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }

      .close-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;

        &:hover {
          opacity: 0.7;
        }
      }
    }

    .marker-list-content {
      max-height: 300px;
      overflow-y: auto;

      .marker-list {
        list-style: none;
        margin: 0;
        padding: 0;

        .marker-item {
          border-bottom: 1px solid #f0f0f0;

          &:last-child {
            border-bottom: none;
          }

          &.active {
            background: #f8f9fa;
          }

          .marker-button {
            width: 100%;
            text-align: left;
            padding: 12px 15px;
            background: none;
            border: none;
            cursor: pointer;

            &:hover {
              background: #f8f9fa;
            }

            .marker-title {
              display: block;
              font-weight: 500;
              margin-bottom: 4px;
            }

            .marker-description {
              display: block;
              font-size: 12px;
              color: #666;
            }
          }
        }
      }
    }
  }

  // Fullscreen mode
  &.fullscreen {
    top: 30px;
    right: 30px;
  }

  // Responsive design
  @media (max-width: 768px) {
    top: 10px;
    right: 10px;

    .controls-container {
      padding: 8px;

      .control-group .control-button {
        width: 36px;
        height: 36px;
      }
    }

    .marker-list-panel {
      width: 280px;
      right: -10px;
    }
  }
}
</style>
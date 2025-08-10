<template>
  <div>
    <button ref="panToButton" id="panToButton" class="visually-hidden">
      Pan to
    </button>
    <button ref="onReturnButton" id="onReturnButton" class="visually-hidden">
      Show markers
    </button>
    <div class="storymap-map">
      <div ref="map" class="map"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Props
interface Props {
  animActive?: boolean
  markers?: any[]
  visitedOnce?: boolean
}

const props = defineProps<Props>()

// Local state
const tuchyn = { lat: '50.711008', lng: '26.573502' }
const nc = { lat: '35.7596', lng: '-79.0193' }

// Template refs
const panToButton = ref<HTMLButtonElement | null>(null)
const onReturnButton = ref<HTMLButtonElement | null>(null)
const map = ref<HTMLDivElement | null>(null)

// Access Nuxt-provided $maps (via useNuxtApp)
const { $maps } = useNuxtApp()

onMounted(() => {
  if (!props.visitedOnce) {
    // Initial animation
    $maps.showMap(map.value, nc.lat, nc.lng, props.markers, 'tuchyn')
  } else {
    // No animation
    $maps.showMap(map.value, tuchyn.lat, tuchyn.lng, props.markers, 'tuchyn')
  }
})
</script>

<style lang="scss">
@use '~/assets/sass/imports/imports.scss' as *;

.map {
  width: 100%;
  height: calc(100%);
  width: 100vw;
  height: calc(100vh);

  @media (max-width: $mobile-bp) {
    height: 100%;
    height: 100vh;
  }
}
</style>

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

// TUCHYN: 50.711008, 26.573502

// Props
interface Props {
  animActive?: boolean
  markers?: any[]
  visitedOnce?: boolean
}

const props = defineProps<Props>()

// Component refs
const panToButton = ref<HTMLButtonElement>()
const onReturnButton = ref<HTMLButtonElement>()
const map = ref<HTMLElement>()

// Component state
const tuchyn = ref({
  lat: "50.711008",
  lng: "26.573502",
})

const nc = ref({
  lat: "35.7596",
  lng: "-79.0193",
})

// Lifecycle
onMounted(() => {
  // set map start location

  // animate
  if (!props.visitedOnce) {
    const { $maps } = useNuxtApp()
    $maps.showMap(
      map.value,
      nc.value.lat,
      nc.value.lng,
      props.markers,
      "tuchyn"
    )
    // if (props.animActive) {
    // //   setTimeout(() => {
    // //     // panToButton.value?.click();
    // //   }, 2500);
    // }
  } else {
    // don't animate
    const { $maps } = useNuxtApp()
    $maps.showMap(
      map.value,
      tuchyn.value.lat,
      tuchyn.value.lng,
      props.markers,
      "tuchyn"
    )
    // onReturnButton.value?.click();
  }
})
</script>

<style lang="scss">
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
<template>
  <div class="map-controls-wrapper">
    <!-- Map Options -->
    <nav class="map-options map-box" v-if="content">
      <h3 class="visually-hidden">
        <LocalizationString :string="content.optionsTitle" />
      </h3>
      <ul>
        <li class="hover-cursor" @click="emit('show-intro')">
          <span class="icon">
            <img class="icon icon-instructions icon-light" src="/icons/instructions.svg" alt="view instructions icon" />
          </span>
          <LocalizationString :string="content.instructionsLabel" />
        </li>
        <li class="hover-cursor" id="recenterMap">
          <span class="icon">
            <img class="icon icon-recenter icon-light" src="/icons/recenter.svg" alt="recenter the map icon" />
          </span>
          <LocalizationString :string="content.recenterLabel" />
        </li>
      </ul>
    </nav>

    <!-- Marker List -->
    <nav class="map-marker-list map-box">
      <h3 v-if="content">
        <LocalizationString :string="content?.markersTitle" />
      </h3>
      <ul v-if="markersSorted.length">
        <MapControlsMarkerListItem v-for="(item, index) in markersSorted" :key="index" :item="item" :index="index" />
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Sanity query
const query = groq`
{
  "content" : *[_type == "settings2"][0],
  "markers" : {
    "marker1": *[_id == "marker1"][0]{ "title": content.title },
    "marker2": *[_id == "marker2"][0]{ "title": content.title },
    "marker3": *[_id == "marker3"][0]{ "title": content.title },
    "marker4": *[_id == "marker4"][0]{ "title": content.title },
    "marker5": *[_id == "marker5"][0]{ "title": content.title },
    "marker6": *[_id == "marker6"][0]{ "title": content.title }
  }
}
`

// Props
const props = defineProps({
  markersData: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits(['show-intro', 'show-timeline'])

const isExpanded = ref(false)

const orderedKeys = ["marker1", "marker2", "marker3", "marker4", "marker5", "marker6"]


// Use Nuxt 3 Sanity composable to fetch data
const { data } = useSanityQuery(query)

const content = computed(() => data?.value?.content)
const markers = computed(() => data?.value?.markers)

// SSR-safe computed property
const markersSorted = computed(() => {
  if (!data.value || !markers.value) return []
  const markerVals = markers.value
  if (!markerVals) return []
  return orderedKeys.map(k => markerVals[k]).filter(Boolean)
})

function toggleMenu() {
  isExpanded.value = !isExpanded.value
}
function showIntro() {
  emit('show-intro')
}
function showTimeline() {
  emit('show-timeline')
}
</script>



<style lang="scss">
@use '~/assets/sass/imports/imports.scss' as *;

.map-marker-list {
  position: absolute;
  top: 90px;
  left: 20px;

  @media (max-height: 550px) {
    overflow: scroll;
    height: 100vh;
  }
}

.map-controls-wrapper .map-options {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 70px;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}


.map-controls-wrapper {
  top: 0;
  // padding: 80px 0px 40px 0;

  h3 {
    font-size: 18px;
    letter-spacing: 0.03em;
    background: black;
    padding: 10px 20px;
  }

  .map-options ul {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;

  }

  .map-marker-list ul {
    background: #4d643f;
    margin-bottom: 15px;
    padding: 15px 20px;

    li {
      font-size: 18px;
      line-height: 22px;
    }
  }

  .map-options ul li {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 14px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    padding: 5px 10px;

    img {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }
  }

  .map-marker-list ul li>span {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .icon {
      flex: 0 0 35px;
      margin-right: 10px;
    }
  }
}

$marker-color-0: #54a131;
$marker-color-1: #70a131;
$marker-color-2: #8ca131;
$marker-color-3: #a19a31;
$marker-color-4: #a17e31;
$marker-color-5: #a16231;

.map-marker-list {
  #marker-0 {
    .icon {
      background-color: $marker-color-0;
    }
  }

  #marker-1 {
    .icon {
      background-color: $marker-color-1;
    }
  }

  #marker-2 {
    .icon {
      background-color: $marker-color-2;
    }
  }

  #marker-3 {
    .icon {
      background-color: $marker-color-3;
    }
  }

  #marker-4 {
    .icon {
      background-color: $marker-color-4;
    }
  }

  #marker-5 {
    .icon {
      background-color: $marker-color-5;
    }
  }

  li>* {
    .icon {
      width: 35px;
      height: 35px;
      transition: 0.3s ease all;
      -webkit-mask-image: url("/icons/pin.svg");
      mask-image: url("/icons/pin.svg");
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: contain;
      mask-size: contain;
      mask-position: center center;
    }

    &:not(.viewed-marker):hover {
      .icon {
        background-color: white;
      }
    }

    &.viewed-marker {
      .icon {
        background-color: $gray !important;
      }

      span span {
        text-decoration: line-through;
        color: $gray;
      }
    }
  }
}
</style>
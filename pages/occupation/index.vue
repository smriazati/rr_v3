<template>
    <div :class="name">
        <h1 class="visually-hidden">{{ name }}</h1>
        <div v-if="nav && viewedAllStories">
            <Pagination v-if="nav?.nav?.next" link="/occupation/talkback" :message="nav.nav.next" />
        </div>
        <MapStorymap ref="storymap" :animActive="true" :markers="markersData" :visitedOnce="visitedOnce" />
        <div v-if="isIntroVisible" class="modal-container transparent">
            <MapIntro @close-modal="closeIntro" />
        </div>
        <div v-show="areMapControlsActive" class="map-controls-outer-wrapper">
            <MapControls :markersData="markersData" @show-intro="showIntro()" />
        </div>
        <div v-if="isModalVisible" class="modal-container">
            <div class="close-overlay" @click="closeModal"></div>
            <MapModal :activeStoryId="activeStoryId" @close-modal="closeModal" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

const query = groq`
{
"nav": *[_id == "settings2"]{
  nav
}[0],
  "metadata": *[_id == "intro2"][0]{
    pageMetadata
  }
}`


const { data: content } = await useSanityQuery(query)

const nav = computed(() => content.value?.nav)
const metadata = computed(() => content.value?.metadata)

// Component state
const name = ref("occupation")
const isPaginationVisible = ref(false)
const isIntroVisible = ref(true)
const isModalVisible = ref(false)
const viewedAllStories = ref(false)
const areMapControlsActive = ref(false)
const storymap = ref()

// Pinia store
const occupationStore = useOccupationStore()

// Computed properties from store
const activeStoryId = computed(() => occupationStore.activeStory)
const viewedStories = computed(() => occupationStore.viewedStories)
const panAnimComplete = computed(() => occupationStore.panAnimComplete)
const visitedOnce = computed(() => occupationStore.visitedOnce)

// Static data
const markersData = ref([
    {
        id: 0,
        name: "judenrat",
        lat: 50.7003356,
        lng: 26.5719255,
    },
    {
        id: 1,
        name: "chomut_house",
        lat: 50.6988032,
        lng: 26.570062,
    },
    {
        id: 2,
        name: "synagogue",
        lat: 50.7082228,
        lng: 26.57203,
    },
    {
        id: 3,
        name: "gendarmerie",
        lat: 50.698633,
        lng: 26.5661871,
    },
    {
        id: 4,
        name: "ghetto",
        lat: 50.7002303,
        lng: 26.5713738,
    },
    {
        id: 5,
        name: "horyn_river",
        lat: 50.710556,
        lng: 26.557222,
    },
])

// Watchers
watch(activeStoryId, (newValue) => {
    if (newValue !== null) {
        isModalVisible.value = true
    }
})

watch(viewedStories, (newValue) => {
    if (!newValue) return
    if (newValue.length === markersData.value.length) {
        viewedAllStories.value = true
        occupationStore.setFirstVisit()
    }
}, { deep: true })

watch(isModalVisible, (newValue) => {
    if (!newValue && viewedAllStories.value) {
        showPagination()
    }
})

watch(panAnimComplete, (newValue) => {
    if (newValue) {
        occupationStore.setFlyoverComplete()
        showMapControls()
    }
})

// Methods
const showPagination = () => {
    isPaginationVisible.value = true
}

const closeModal = () => {
    isModalVisible.value = false
    resetActiveStory()
}

const resetActiveStory = () => {
    occupationStore.resetActiveStory()
}

const closeIntro = () => {
    isIntroVisible.value = false

    // if visited once, click return button. if visited first, click pan to button
    if (visitedOnce.value || areMapControlsActive.value) {
        const showMap = storymap.value?.$refs?.onReturnButton
        showMap?.click()
    } else {
        const panToMap = storymap.value?.$refs?.panToButton
        panToMap?.click()
    }
}

const showIntro = () => {
    isIntroVisible.value = true
}

const showMapControls = () => {
    areMapControlsActive.value = true
}

// Lifecycle
onMounted(() => {
    if (visitedOnce.value) {
        areMapControlsActive.value = true
    }
    showIntro()
})


useHead(() => ({
    title: 'Occupation'
}))
</script>

<style lang="scss">
.occupation {
    max-width: 100vw;
    min-height: 100vh;
    overflow: hidden;

    h1 {
        justify-content: center;
        text-align: center;

        @media (max-width: 1100px) {
            font-size: 48px;
            line-height: 52px;
        }
    }
}
</style>
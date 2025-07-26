<template>
    <div ref="wrapper" :class="name" class="text-scroller-page">
        <h1 class="visually-hidden">{{ name }}</h1>
        <div class="scroll-progress-bar-wrapper">
            <ScrollProgressBar :height="wrapperHeight" />
        </div>
        <div class="wrapper">
            <div class="image-zoom-wrapper">
                <LocalizationImageZoomer :height="wrapperHeight" :img="bgImg"></LocalizationImageZoomer>
            </div>
            <div class="text-scroller-wrapper" v-if="panels">
                <SystemTextScroller :panels="panels" :pagination="nav" route="aftermath" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import groq from 'groq'

const name = ref('aftermath')
const wrapperHeight = ref<number | null>(null)
const wrapper = ref<HTMLElement | null>(null)

const query = groq`*[_type == "landing4"][0]`
const { data: content } = await useSanityQuery<any>(query)

const bgImg = computed(() => content.value?.bgImg)
const panels = computed(() => content.value?.panels)
const nav = computed(() => content.value?.nav)
const pageMetadata = computed(() => content.value?.pageMetadata)

function setWrapperHeight() {
    if (panels.value) {
        wrapperHeight.value = window.innerHeight * panels.value.length
    }
}

onMounted(() => {
    setWrapperHeight()
    window.addEventListener('resize', setWrapperHeight)
})

onUnmounted(() => {
    window.removeEventListener('resize', setWrapperHeight)
})

useHead(() => ({
    title: useSetPageTitle(pageMetadata)
}))
</script>

<style lang="scss">
@use '~/assets/sass/imports/imports.scss' as *;

.aftermath {
    .text-wrapper {
        p {
            @include pBigStyle();
        }
    }

    @media (max-width: $collapse-bp) {
        .text-scroller .panel:last-child {
            padding-bottom: 100px;
        }

        .pagination {
            position: fixed;
            bottom: 0;
            width: 100%;
        }
    }
}
</style>
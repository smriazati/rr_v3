<template>
    <div ref="wrapper" :class="name" class="text-scroller-page">
        <h1 class="visually-hidden">{{ name }}</h1>
        <div class="wrapper">
            <div class="text-scroller-wrapper" v-if="panels">
                <TextScrollerNew :blocks="panels" :bgImg="bgImg" @scrolled-to-end="showPagination" />
            </div>
            <div v-if="nav && isPaginationVisible">
                <Pagination v-if="nav?.next" link="/intro/stories" :message="nav.next" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const name = ref('aftermath')
const wrapperHeight = ref<number | null>(null)
const wrapper = ref<HTMLElement | null>(null)

const query = groq`*[_type == "landing4"][0]`
const { data: content } = await useSanityQuery<any>(query)
const panels = computed(() => content.value?.panels)
const nav = computed(() => content.value?.nav)
const bgImg = computed(() => content.value?.bgImg)


const isPaginationVisible = ref(false);
function showPagination() {
    isPaginationVisible.value = true;
}

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
    title: 'Aftermath'
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
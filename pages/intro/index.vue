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
import { ref, onMounted, onUnmounted, computed } from 'vue'
import groq from 'groq'

const name = ref('introduction')
const wrapper = ref<HTMLElement | null>(null)

interface SanityContent {
  panels: any[]
  nav: Record<string, any>
  bgImg: any,
  pageMetadata: Record<string, any>
}

const query = groq`*[_type == "landing1"][0]`
const { data: content } = await useSanityQuery<SanityContent>(query)
const panels = computed(() => content.value?.panels)
const nav = computed(() => content.value?.nav)
const bgImg = computed(() => content.value?.bgImg)

const isPaginationVisible = ref(false);
function showPagination() {
  isPaginationVisible.value = true;
}

useHead({
  title: 'Introduction'
})

</script>

<style lang="scss">
@use '~/assets/sass/imports/imports.scss' as *;

.introduction {
  &.text-scroller-page .wrapper .nuxt-content p {
    background: transparent !important;
  }

  &.text-scroller-page>.wrapper {
    background: rgba(10, 10, 10, 0.4);
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
<template>
  <div ref="wrapper" class="story-wrapper">
    <div ref="storyWrapper">
      <StoriesIntro :subjectId="`subject${id}`" sectionId="intro" :schema="`story1_${id}`" />
    </div>
    <div class="pagination-row flex-row" v-show="isPaginationVisible">
      <PaginationHash link="/intro/stories" hash="stories" :message="nav?.nav?.prev" :back="true" />
      <Pagination link="/occupation" :message="nav?.nav?.next" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import groq from 'groq'

const name = ref('intro-stories')
const isPaginationVisible = ref(true)

const route = useRoute()
const id = computed(() => route.params.id)

const query = computed(() => groq`
{
  "nav": *[_id == "settings1"]{
    nav
  }[0],
  "metadata": *[_id == "story1_${id.value}"][0]{
    pageMetadata
  }
}`)

const { data: result } = await useSanityQuery<any>(query)

const nav = computed(() => result.value?.nav)
const metadata = computed(() => result.value?.metadata)

function showPagination() {
  isPaginationVisible.value = true
}

useHead(() => ({
  title: useSetPageTitle(metadata.value?.pageMetadata)
}))
</script>

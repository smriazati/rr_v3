<template>
  <div ref="wrapper" class="story-wrapper">
    <div ref="storyWrapper">
      <StoriesIntro :subjectId="`subject${id}`" sectionId="intro" :content="content" />
    </div>
    <div class="pagination-row flex-row">
      <Pagination link="/intro/stories" :message="nav?.nav?.prev" :back="true" />
      <Pagination link="/occupation" :message="nav?.nav?.next" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'



const route = useRoute()
const id = route.params.id as string

const query = groq`
{
  "nav": *[_id == "settings1"][0]{ nav },
  "metadata": *[_id == "story1_${id}"][0]{ pageMetadata },
  "content": *[_id == "story1_${id}"][0]{ "sections": content.sections }
}`

const { data: result } = await useSanityQuery<any>(query)

const nav = computed(() => result.value?.nav)
const metadata = computed(() => result.value?.metadata)
const content = computed(() => result.value?.content?.sections || [])

console.log('content', content.value)
const { pageTitle } = useSetPageTitle(metadata?.value.pageMetadata)

useHead({
  title: pageTitle
})
</script>

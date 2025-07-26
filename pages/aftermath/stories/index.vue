<template>
    <div class="aftermath-stories-page-wrapper">
        <StoriesSubjects :title="title" :subtitle="subhead" :subjectCTA="subjectCTA" route="aftermath" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import groq from 'groq'

const name = ref('aftermath-stories')

const query = groq`*[_type == "intro4"][0]`
const { data: content } = await useSanityQuery<any>(query)

const title = computed(() => content.value?.title)
const subhead = computed(() => content.value?.subhead)
const subjectCTA = computed(() => content.value?.subjectCTA)
const pageMetadata = computed(() => content.value?.pageMetadata)

onMounted(() => {
    const body = document.querySelector('body')
    if (body) body.style.height = 'auto'
})

useHead(() => ({
    title: useSetPageTitle(pageMetadata)
}))
</script>


<style lang="scss">
.route-aftermath-stories .stories-subjects-wrapper {
    min-height: 100vh;
}

.aftermath-stories-page-wrapper {
    margin-top: 50px;
    padding: 0 30px;

    .stories-subjects-wrapper {
        padding-right: 0px;
    }
}

@media (max-height: 700px) {
    img {
        width: 300px;
    }
}
</style>
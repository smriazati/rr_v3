<template>
    <div ref="wrapper" class="story-wrapper">
        <div ref="storyWrapper">
            <StoriesIntro :subjectId="`subject${this.$route.params.id}`" sectionId="intro"
                :schema="`story1_${this.$route.params.id}`" />
        </div>
        <div class="pagination-row flex-row" v-show="isPaginationVisible">
            <PaginationHash link="/intro/stories" hash="stories" :message="nav?.nav?.prev" :back="true" />
            <Pagination link="/occupation" :message="nav?.nav?.next" />
        </div>
    </div>
</template>
  
<script>
import { groq } from '@nuxtjs/sanity'


export default {
    asyncData({ $sanity, params }) {

        const schema = "settings1"
        const query = groq`
{
    "nav": *[_id == "${schema}"]{
        nav
    }[0],
    "metadata": *[_id == "story1_${params.id}"][0]{
        pageMetadata
    }
}
`
        const data = $sanity.fetch(query)
        return data
    },
    data() {
        return {
            name: "intro-stories",
            isPaginationVisible: true
        };
    },
    head() {
        return {
            title: this.$setPageTitle(this.metadata.pageMetadata)
        }
    },
    methods: {
        showPagination() {
            this.isPaginationVisible = true;
        },
    },
};
</script>
  

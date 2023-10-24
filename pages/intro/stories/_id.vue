<template>
    <div ref="wrapper" class="story-wrapper">
        <div ref="storyWrapper">
            <StoriesIntro :subjectId="`subject${Number(this.$route.params.id) + 1}`" sectionId="intro"
                :schema="`story1_${Number(this.$route.params.id) + 1}`" />
        </div>
        <div class="pagination-row flex-row" v-show="isPaginationVisible">
            <PaginationHash link="/intro/stories" hash="stories" :message="nav?.prev" :back="true" />
            <Pagination link="/occupation" :message="nav?.next" />
        </div>
    </div>
</template>
  
<script>
import { groq } from '@nuxtjs/sanity'
const schema = "settings1"
const query = groq`*[_type == "${schema}"][0]{
    nav
  }`

export default {
    asyncData({ $sanity }) {
        const nav = $sanity.fetch(query)
        return nav
    },
    data() {
        return {
            name: "intro-stories-individual",
            isPaginationVisible: true,
            pageNames: {
                1: "Meet Luba Chomut",
                2: "Meet Yosef Zilberberg",
                3: "Meet Mania Schwartzman",
            },
        };
    },
    head() {
        return {
            title: this.$setPageTitle(this.pageMetadata)
        }
    },
    methods: {
        showPagination() {
            this.isPaginationVisible = true;
        },
    },
};
</script>
  

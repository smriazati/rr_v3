<template>
  <div ref="wrapper" :class="name" class="stories-individual">
    <h1 class="visually-hidden">{{ name }}</h1>
    <div ref="storyWrapper">
      <StoriesIntro :subjectId="`subject${this.$route.params.id}`" sectionId="intro"
        :schema="`story1_${this.$route.params.id}`" />
    </div>
    <div class="pagination-row flex-row" v-show="isPaginationVisible">
      <Pagination link="/1/stories" :message="nav?.prev" :back="true" />
      <Pagination link="/2" :message="nav?.next" />
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
      title: this.pageNames[this.$route.params.id],
    };
  },
  methods: {
    showPagination() {
      this.isPaginationVisible = true;
    },
  },
};
</script>

<style lang="scss">
// static pagination
.stories-individual.intro-stories-individual {
  .pagination-row {
    display: flex;
    width: 100%;
    justify-content: space-between;

    nav.pagination {
      position: relative;
    }
  }
}
</style>
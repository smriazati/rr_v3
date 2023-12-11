<template>
  <div :class="name" class="stories-page-wrapper">
    <div class="intro-text-wrapper text-wrapper">
      <StoriesSubheadline></StoriesSubheadline>
      <h1 class="center">
        <LocalizationString :string="title"></LocalizationString>
      </h1>
      <LocalizationRte :content="mainText"></LocalizationRte>
    </div>
    <StoriesSubjects :title="subhead" :subtitle="subheadText" :subjectCTA="subjectCTA" route="intro" />
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'
const schema = "intro1"
const query = groq`*[_type == "${schema}"][0]`


export default {
  asyncData({ $sanity }) {
    const content = $sanity.fetch(query)
    return content
  },

  data() {
    return {
      name: "introduction-stories",
    };
  },
  mounted() {
    const body = document.querySelector('body');
    body.style.height = 'auto'
  },
  head() {
    return {
      title: this.$setPageTitle(this.pageMetadata)
    }
  },
};
</script>

<style lang="scss">
.stories-page-wrapper {
  background: linear-gradient(180deg, #162D11 0%, #375132 100%);
  flex: 100%;

  .intro-text-wrapper {
    max-width: 586px;
    margin: 0 auto;
    padding: 100px 10px;

    @media (max-width: $collapse-bp) {
      padding: 100px 20px 0 20px;
    }
  }

  h1,
  h2 {
    display: flex;
    justify-content: center;
  }

}
</style>


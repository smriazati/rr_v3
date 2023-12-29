<template>
  <div :class="name" class="stories-page-wrapper">
    <header class="intro-text-wrapper">
      <div class="wrapper">
        <StoriesSubheadline></StoriesSubheadline>
        <h1 class="center">
          <LocalizationString :string="title"></LocalizationString>
        </h1>
        <LocalizationRte :content="mainText"></LocalizationRte>
      </div>
    </header>
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
  display: grid;
  min-width: 100%;
  min-height: 100vh;
  place-content: center;
  width: 100%;
  grid-template-columns: 40% 60%;
  grid-gap: 30px;

  @media (max-width: 680px) {
    display: flex;
    flex-direction: column;
  }

  padding: 80px 15px;

  header {
    display: flex;
    align-items: flex-start;
    padding-left: 20px;

    .wrapper {
      background: black;
      border: 1px solid white;
      padding: 30px;

      >*:not(:last-child) {
        margin-bottom: 15px;
      }

      p+p {
        margin-top: 15px;
      }
    }

    h2 {
      display: flex;
      justify-content: center;
    }
  }

  h1,
  .h1 {
    font-size: 48px;
    line-height: 52px;
  }

  .subheadline {
    font-size: 18px;
    line-height: 22px;
  }
}
</style>


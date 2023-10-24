<template>
  <div :class="name" class="stories-landing-page">
    <div class="story-lp-images-wrapper">
      <StoryLandingPageImages :sectionIndex="4" :title="title" :subtitle="subhead" />
    </div>
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'
const schema = "intro4"
const query = groq`*[_type == "${schema}"][0]`

export default {
  asyncData({ $sanity }) {
    const content = $sanity.fetch(query)
    return content
  },
  data() {
    return {
      name: "aftermath-stories",
    };
  },
  head() {
    return {
      title: this.name
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1);
        })
        .join(" "),
    };
  },
};
</script>


<style lang="scss">
.aftermath-stories {
  @media (max-width: $collapse-bp) {
    padding-top: 60px;
  }

  position: relative;

  .text-wrapper {
    // background: $gray;
    padding: 30px;
    max-width: 60ch;
    margin-bottom: 60px;

    >*:last-child {
      margin-bottom: 0px;
    }
  }
}
</style>

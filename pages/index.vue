<template>
  <div class="exhibit-homepage-wrapper">
    <header class="flex-col align-center">
      <div class="text-wrapper centered">
        <h1 class="subheadline">
          <div v-if="subhead">
            <LocalizationString :string="subhead"></LocalizationString>
          </div>
        </h1>
        <h2 class="h1 collapsed-mb">
          <div v-if="title">
            <LocalizationString :string="title"></LocalizationString>
          </div>
        </h2>
      </div>
      <button ref="button" class="light full-width">
        <nuxt-link :to="{ path: `/intro`, query: $route.query }">
          <div v-if="ctaText">
            <LocalizationString :string="ctaText"></LocalizationString>
          </div>
        </nuxt-link>
      </button>
    </header>
    <ExhibitLandingPageFooter></ExhibitLandingPageFooter>
  </div>
</template>

<script>

import { groq } from '@nuxtjs/sanity'
const schema = "intro0"
const query = groq`*[_type == "${schema}"][0]`

export default {
  layout: 'home',
  asyncData({ $sanity }) {
    const content = $sanity.fetch(query);
    return content;
  },
  data() {
    return {
      name: "home"
    };
  },
  head() {
    return {
      title: this.$setPageTitle(this.pageMetadata)
    }
  },
};
</script>

<style lang="scss">
.exhibit-homepage-wrapper {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;

  header {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    background-color: #192912;
    overflow: hidden;

    @media (max-height: 400px) {
      overflow: scroll;
    }

    &:before {
      content: "";
      background-image: url('/icons/tree.svg');
      background-repeat: no-repeat;
      background-position: center;
      filter: grayscale(0.9) blur(3px) brightness(2);
      opacity: 0.3;
      position: absolute;
      height: 150%;
      width: 100%;
      top: -5%;
    }

    * {
      position: relative;
    }

  }

  .text-wrapper h1:not(.collapsed-mb) {
    margin-bottom: 30px;
  }

  h1,
  h2.h1 {
    display: flex;
    justify-content: center;

  }

  @media (max-width: 650px) {

    .subheadline {
      font-size: 14px;
    }

    h2.h1 {
      font-size: 48px;
    }

  }

  @media (min-width: 650px) {

    h2.h1 {
      font-size: 72px;
    }
  }


}
</style>


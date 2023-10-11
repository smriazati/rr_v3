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
        <nuxt-link to="/1/">
          <div v-if="ctaText">
            <LocalizationString :string="ctaText"></LocalizationString>
          </div>
        </nuxt-link>
      </button>
    </header>

    <LandingPageFooter></LandingPageFooter>
  </div>
</template>

<script>

import { groq } from '@nuxtjs/sanity'
import LandingPageFooter from '../components/Exhibit/LandingPageFooter.vue';
const schema = "intro0"
const query = groq`*[_type == "${schema}"][0]`

export default {
  asyncData({ $sanity }) {
    const content = $sanity.fetch(query);
    return content;
  },
  data() {
    return {
      name: "home",
    };
  },
  head() {
    return {
      title: this.name.charAt(0).toUpperCase() + this.name.slice(1),
    };
  },
  components: { LandingPageFooter }
};
</script>

<style lang="scss">
.exhibit-homepage-wrapper {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;

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

  h1 {
    display: flex;
    justify-content: center;
  }

}
</style>


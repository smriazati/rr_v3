<template>
  <div class="default-layout home-layout route-home">
    <ExhibitNav />
    <div class="home-language-picker">
      <LocalizationLanguagePicker></LocalizationLanguagePicker>
    </div>

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
  </div>
</template>

<script setup lang="ts">
// groq is auto-imported in Nuxt 3
const schema = "intro0"
const query = groq`*[_type == "${schema}"][0]`

// Fetch data
const { data: content } = await useSanityQuery<any>(query)

// Extract data from content
const title = computed(() => content.value?.title)
const subhead = computed(() => content.value?.subhead)
const ctaText = computed(() => content.value?.ctaText)


// Set page metadata
useHead({
  title: 'Home'
})
</script>

<style lang="scss">
.default-layout {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 100vw;
  overflow-x: hidden;
}

.home-layout {
  .home-language-picker {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    padding: 20px;
  }
}

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

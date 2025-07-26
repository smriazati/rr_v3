<template>
  <div :class="name" class="stories-page-wrapper resistance-page-wrapper ">
    <header class="intro-text-wrapper text-wrapper">
      <div class="wrapper">
        <StoriesSubheadline></StoriesSubheadline>
        <h1 class="center">
          <LocalizationString :string="title"></LocalizationString>
        </h1>
        <p>
          <LocalizationString :string="subtext"></LocalizationString>
        </p>
        <div>
          <LocalizationRte :content="instructions"></LocalizationRte>
        </div>
      </div>
    </header>

    <div class="row-wrapper">
      <div class="row">

        <div class="video-wrapper vimeo-component">
          <VimeoComponent vidId="650434994" @on-vid-playing="onVidPlaying" @on-vid-ended="onVidEnded()"
            @on-vid-time-update="onVidTimeUpdate">
          </VimeoComponent>
        </div>

        <div v-if="isPaginationVisible" class="pagination-wrapper">
          <div v-if="nav">
            <Pagination v-if="nav?.next" link="/resistance/talkback" :message="nav.next" />
          </div>
        </div>
      </div>
    </div>


  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import groq from 'groq'

const name = ref('resistance')
const isFilmEnded = ref(false)
const isPaginationVisible = ref(false)
const isFilmActive = ref(false)
const isFilmPlaying = ref(false)
const options = {
  controls: true,
  loop: false,
  autoplay: false,
  muted: false,
  portrait: false,
  title: false,
  byline: false,
}
const timeToShowPagination = ref<number | undefined>(undefined)
const timeBeforeEnd = 10

// Data fetching
const query = groq`*[_type == "intro3"][0]`
const { data: content } = await useSanityQuery<any>(query)

// Extract data for template
const title = computed(() => content.value?.title)
const subtext = computed(() => content.value?.subtext)
const instructions = computed(() => content.value?.instructions)
const nav = computed(() => content.value?.nav)
const pageMetadata = computed(() => content.value?.pageMetadata)

// Set page metadata
useHead(() => ({
  title: useSetPageTitle(pageMetadata)
}))

function onVidPlaying(duration: number) {
  if (!timeToShowPagination.value) {
    timeToShowPagination.value = duration - timeBeforeEnd
  }
}
function onVidTimeUpdate(seconds: number) {
  if (seconds < (timeToShowPagination.value ?? 0)) return
  showPagination()
}
function onVidEnded() {
  isFilmEnded.value = true
  showPagination()
}
function showPagination() {
  isPaginationVisible.value = true
}
function hidePagination() {
  isPaginationVisible.value = false
}
function showFilm() {
  isFilmActive.value = true
  pauseBgVid()
  playFilm()
}
function hideFilm() {
  isFilmActive.value = false
  playBgVid()
  pauseFilm()
}
function pauseFilm() {
  // Not implemented: would need a ref to the video player
}
function playFilm() {
  // Not implemented: would need a ref to the video player
}
function pauseBgVid() {
  // Not implemented: would need a ref to the background video player
}
function playBgVid() {
  // Not implemented: would need a ref to the background video player
}
</script>

<style lang="scss">
.resistance-page-wrapper {
  display: grid;
  min-height: 100vh;
  place-content: center;
  min-width: 100%;
  width: 100%;
  grid-template-columns: 40% 60%;
  grid-gap: 30px;

  @media (max-height: 600px) {
    display: flex;
    flex-direction: column;

    header {
      margin: 30px auto;
      max-width: 50ch;
    }
  }

  padding: 0 15px;

  @media (max-width: 680px) {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
  }

  .iframe-wrapper>div {
    width: 95%;
  }

  .vimeo-component .iframe-wrapper {
    box-shadow: none;
  }

  header {
    display: flex;
    align-items: flex-start;
    padding-left: 20px;

    span {
      justify-content: center;
    }

    .wrapper {
      background: black;
      border: 1px solid white;
      padding: 30px;

      >*:not(:last-child) {
        margin-bottom: 15px;
      }

      p {
        margin-bottom: 15px;
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

  .pagination {
    bottom: 15px;
    right: 15px;
  }
}

@media (max-height: 600px) {

  .resistance-page-wrapper {

    display: flex;
    flex-direction: column;

    header {
      margin: 30px auto;
      max-width: 50ch;
    }

    .pagination {
      position: relative;
      max-width: 300px;
      margin: 0 auto;
    }

    .iframe-wrapper>div {
      padding-top: 51.25%;
    }
  }
}
</style>
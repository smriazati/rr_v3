<template>
  <div :class="name" class="stories-page-wrapper resistance-page-wrapper">
    <header class="intro-text-wrapper text-wrapper">
      <div class="wrapper">
        <StoriesSubheadline />
        <h1 class="center">
          <LocalizationString :string="title" />
        </h1>
        <p>
          <LocalizationString :string="subtext" />
        </p>
        <div>
          <LocalizationRte :content="instructions" />
        </div>
      </div>
    </header>

    <div class="row-wrapper">
      <div class="row">
        <div class="video-wrapper vimeo-component">
          <ClientOnly>
            <vueVimeoPlayer video-id="650434994" @playing="onVidPlaying" @ended="onVidEnded"
              @timeupdate="onVidTimeUpdate" />
          </ClientOnly>
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

<script setup>
import { ref, onMounted } from 'vue'
import { vueVimeoPlayer } from 'vue-vimeo-player'

const name = 'resistance'
const vimeoEl = ref(null)
const isPaginationVisible = ref(false)
const isFilmEnded = ref(false)
const timeToShowPagination = ref(undefined)
const timeBeforeEnd = 10


const { data } = await useSanityQuery(`*[_type == "intro3"][0]`)
const { pageMetadata, title, subtext, instructions, nav } = data.value || {}
useSetPageTitle(pageMetadata)

function showPagination() {
  isPaginationVisible.value = true
}

function onVidPlaying(duration) {
  if (!timeToShowPagination.value) {
    timeToShowPagination.value = duration - timeBeforeEnd.value;
  }
}

function onVidTimeUpdate(seconds) {
  if (seconds < timeToShowPagination.value) { return }
  showPagination();
}

function onVidEnded() {
  isFilmEnded.value = true;
  showPagination();
}

useHead(() => ({
  title: 'Resistance'
}))

</script>


<style lang="scss">
iframe {
  width: 94%;
  height: auto;
  aspect-ratio: 16 / 9;
}

.resistance-page-wrapper {
  display: grid;
  min-height: 100vh;
  place-content: center;
  min-width: 100%;
  width: 100%;
  grid-template-columns: 40% 60%;
  grid-gap: 30px;

  padding: 0 15px;
  @media (max-height: 600px) {
    display: flex;
    flex-direction: column;

    header {
      margin: 30px auto;
      max-width: 50ch;
    }
  }


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
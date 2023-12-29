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
          <VimeoComponent vidId="650434994"></VimeoComponent>
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


<script>

import { groq } from '@nuxtjs/sanity'
const schema = "intro3"
const query = groq`*[_type == "${schema}"][0]`

export default {
  asyncData({ $sanity }) {
    const content = $sanity.fetch(query)
    return content
  },
  data() {
    return {
      name: "resistance",
      isFilmEnded: false,
      isPaginationVisible: true,
      isFilmActive: false,
      isFilmPlaying: false,
      options: {
        controls: true,
        loop: false,
        autoplay: false,
        muted: false,
        portrait: false,
        title: false,
        byline: false,
      },
    };
  },
  head() {
    return {
      title: this.$setPageTitle(this.pageMetadata)
    }
  },
  methods: {
    onFilmEnded() {
      this.isFilmEnded = true;
      this.showPagination();
    },
    showPagination() {
      this.isPaginationVisible = true;
    },
    hidePagination() {
      this.isPaginationVisible = false;
    },
    showFilm() {
      this.isFilmActive = true;
      this.pauseBgVid();
      this.playFilm();
    },
    hideFilm() {
      this.isFilmActive = false;
      this.playBgVid();
      this.pauseFilm();
    },
    onFilmPlaying() {
      this.isFilmPlaying = true;
    },
    pauseFilm() {
      this.$refs.vid.pause();
    },
    playFilm() {
      this.$refs.vid.play();
    },
    pauseBgVid() {
      if (this.$refs.vidBg) {
        this.$refs.vidBg.$refs.player.pause();
      }
    },
    playBgVid() {
      if (this.$refs.vidBg) {
        this.$refs.vidBg.$refs.player.play();
      }
    },
  },
};
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
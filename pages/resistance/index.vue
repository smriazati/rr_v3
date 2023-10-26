<template>
  <div :class="name" class="stories-page-wrapper resistance-page-wrapper ">
    <div class="intro-text-wrapper text-wrapper">
      <StoriesSubheadline></StoriesSubheadline>
      <h1 class="center">
        <LocalizationString :string="title"></LocalizationString>
      </h1>
      <p>
        <LocalizationString :string="subtext"></LocalizationString>
      </p>
    </div>

    <div class="row-wrapper">
      <div class="row">
        <div class="text-wrapper">
          <LocalizationRte :content="instructions"></LocalizationRte>
        </div>
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
  .pagination {
    bottom: 82px;
  }

  &.stories-page-wrapper .row-wrapper {
    padding-bottom: 175px;
  }
}

.stories-page-wrapper {
  background: linear-gradient(180deg, #162D11 0%, #375132 100%);
  flex: 100%;

  .intro-text-wrapper {
    max-width: 586px;
    margin: 0 auto;
    padding: 100px 10px;

    h2 {
      display: flex;
      justify-content: center;
    }
  }

  .row-wrapper {
    background: $gray;
    padding: 10% 30px;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    max-width: 1080px;
    margin: 0 auto;
    margin-bottom: 54px;
    align-items: center;

    .text-wrapper {
      flex: 0 0 45ch;
      padding: 0 30px;
    }

    .video-wrapper {
      flex: 2;
    }

    .button-wrapper {
      flex: 0 0 100%;
      margin-top: 30px;
    }
  }


}
</style>
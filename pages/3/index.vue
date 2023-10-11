<template>
  <div :class="name">
    <h1 class="visually-hidden">{{ name }}</h1>
    <div class="video-intro">
      <div class="video-background">
        <VimeoComponentBg ref="vidBg" vidId="650435263" />
      </div>
      <div class="video-intro-text">
        <div class="call-out">
          <div class="text-wrapper">
            <h1 class="center">
              <LocalizationString :string="title"></LocalizationString>
            </h1>
            <p class="big">
              <LocalizationString :string="subtext"></LocalizationString>
            </p>
          </div>
          <div class="text-wrapper instructions">
            <button class="cursor-hover bright" @click="showFilm()">
              <span class="text collapse-pd-right">
                <LocalizationString :string="ctaText"></LocalizationString>
              </span>
              <SystemIcon type="play" :width="20" color="light" />
            </button>
            <div>
              <LocalizationRte :content="instructions"></LocalizationRte>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="isFilmActive" class="resistance-film">
      <div class="col flex-col">
        <div :class="isFilmPlaying ? 'fade-in-video' : ''" class="init-vid-fade iframe-wrapper">
          <client-only>
            <vimeo-player ref="vid" key="650434994" video-url="https://vimeo.com/650434994" video-id="650434994"
              :options="options" @playing="onFilmPlaying" @ended="onFilmEnded">
            </vimeo-player>
          </client-only>
        </div>
        <div v-show="!isPaginationVisible" class="text">
          <p class="small muted">Complete the video to unlock the next page.</p>
        </div>
      </div>
      <button class="flat close-button" @click="hideFilm">
        <span class="icon icon-close"></span>
      </button>
    </div>

    <div v-show="isPaginationVisible">
      <div v-if="nav">
        <Pagination link="/3/talkback" :message="nav?.next" />
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
  head() {
    return {
      title: this.name.charAt(0).toUpperCase() + this.name.slice(1),
    };
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
.resistance {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .pagination {
    z-index: 999;
  }

  width: 100vw;

  @media (min-height: $collapse-bp) {
    height: 100vh;
    overflow: hidden;
  }

  .video-intro {
    position: relative;
    width: 100%;
    height: 100%;

    overflow: hidden;

    .video-background {
      position: absolute;
      z-index: 9;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .video-intro-text {
    z-index: 11;
    position: relative;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    width: 100%;
    height: 100%;

    @media (min-width: $collapse-bp) {
      width: 50ch;
      position: absolute;
      left: calc((100% - 50ch) / 2);
      max-height: 80%;
      height: 100%;
      max-width: 80%;
      top: 10%;
    }

    @media (max-width: $collapse-bp) {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .call-out {
      background: rgba($gray, 0.8);

      @media (max-width: $collapse-bp) {
        overflow-y: scroll;
        padding-top: 60px;
      }

      @media (max-height: 620px) {
        overflow-y: scroll;
      }

      border: 0;
    }

    // p.big {
    //   font-size: 24px;
    //   line-height: 30px;
    // }
  }

  .resistance-film {
    position: fixed;
    z-index: 909;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vw;
    // background: rgba($gray, 0.95);

    div.col {
      background: rgba($gray, 0.95);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      min-height: 100vh;
    }

    .text {
      text-align: right;
      max-width: 1280px;
      margin-top: 30px;
      width: 100%;
      position: fixed;
      bottom: 0px;
      right: 0px;
      padding: 30px;

      p {
        font-size: 16px;
        font-style: italic;
        color: lighten($gray, 60);

        @media (max-width: $collapse-bp) {
          font-size: 12px;
          line-height: 16px;
          max-width: 50%;
          margin-left: auto;
        }
      }
    }

    .iframe-wrapper {
      padding: 0;
      margin: 0;
      max-width: 1280px;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
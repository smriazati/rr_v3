<template>
  <div class="video-component-container">
    <button class="pauseBtn" @click="togglePlayback">
      <span v-if="isPlaying">
        <LocalizationString :string="labels?.pause"></LocalizationString>
      </span>
      <span v-else>
        <LocalizationString :string="labels?.play"></LocalizationString>
      </span>
    </button>

    <div :id="vidId" class="vimeo-component" :class="isPlaying ? 'playing' : ''" @click="playVid">
      <client-only>
        <div class="iframe-wrapper" v-if="vidId" ref="vidWrapper">
          <vimeo-player ref="vid" :key="vidId" :video-url="`https://vimeo.com/${vidId}`" :video-id="vidId"
            :options="options" @ready="onVidReady" @loaded="onVidLoaded" @playing="onVidPlaying" @pause="onVidPaused"
            @timeupdate="onVidTimeUpdate" @ended="onVidEnded">
          </vimeo-player>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
// https://github.com/dobromir-hristov/vue-vimeo-player


import { groq } from '@nuxtjs/sanity'
const schema = "settings"
const query = groq`*[_type == "${schema}"]{
  "pause": vidPlaybackLabels.pause,
  "play": vidPlaybackLabels.play
}[0]`


export default {
  async fetch() {
    this.labels = await this.$sanity.fetch(query)
  },
  fetchOnServer: false,
  props: {
    vidId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      labels: '',
      options: {
        controls: true,
        loop: false,
        autoplay: false,
        muted: false,
        portrait: false,
        title: false,
        byline: false,
      },
      isPlaying: false,
    };
  },
  methods: {
    togglePlayback() {
      if (this.isPlaying) {
        this.pauseVid();
      } else {
        this.playVid();
      }
    },
    playVid() {
      // console.log('play vid')
      this.isPlaying = true;
      this.$emit("on-vid-playing", true);
      this.$refs.vid.play();
      this.pauseOtherVids();
    },
    pauseOtherVids() {
      const ref = this.$refs.vid;
      if (!ref) { return };
      const id = ref.$el.id;
      const container = ref.$el.closest("div.story")
      if (!container) { return };
      const otherVids = container.querySelectorAll(`[id^='vimeo-player']:not([id='${id}'])`)
      // console.log('ref', ref.$el.id)
      // console.log('container', container)
      // console.log('otherVids', otherVids)
      otherVids.forEach(vid => {
        const component = vid.closest('.vimeo-component');
        const isPlaying = component?.classList.contains('playing')
        // console.log('other vid isPlaying', isPlaying)
        if (isPlaying) {
          const pauseBtn = component?.parentElement?.querySelector('.pauseBtn');
          if (!pauseBtn) { return }
          pauseBtn.click();
          // console.log('clicked other vid pauseBtn')
        }
      })

    },
    pauseVid() {
      console.log("pauseVid function now");
      this.isPlaying = false;
      this.$emit("on-vid-pausing", false);
      this.$refs.vid.pause();
    },
    onVidLoaded() {
      // console.log("loaded");
    },
    onVidReady() {
      // console.log("ready now");
    },
    onVidPlaying() {
      // console.log("playing now");
      if (!this.isPlaying) {
        this.isPlaying = true;
      }
      this.$emit("on-vid-playing", true);
    },
    onVidPaused() {
      console.log("on vid paused now");
      if (this.isPlaying) {
        this.isPlaying = false;
      }
      this.$emit("on-vid-pausing", false);
    },
    onVidEnded() {
      // console.log("ended now");
      if (this.isPlaying) {
        this.isPlaying = false;
      }
      this.$emit("on-vid-ended");
    },
    onVidTimeUpdate(event, data, player) {
      //   console.log(event, data, player);
    },
  },
};
</script>

<style lang="scss">
.vimeo-component .vimeo-component {

  position: relative;

  // &:not(.playing) {
  //   &:after {
  //     content: '▶';
  //     font-size: 120px;

  //     color: #FFF;
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //     background: $sage;
  //     transition: .3s ease all;
  //     position: absolute;
  //     width: 100%;
  //     height: 100%;
  //     top: 0;
  //     left: 0;
  //   }

  //   &:hover {
  //     cursor: pointer;

  //     &:after {
  //       background: #192912;
  //     }
  //   }
  // }

}

.video-component-container {
  display: flex;
  flex-direction: column-reverse;
}

.vimeo-component {
  button {
    display: none !important;
  }

  .pauseBtn {
    z-index: 100;
    margin: 0;
    border-radius: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 3px 0;

    span {
      padding: 3px 0;
    }
  }

  flex: 1;

  // margin: 1rem;
  .caption {
    margin-top: 8px;
  }

  @media (min-width: $collapse-bp) {
    // padding: 30px;
    border-radius: 6px;
  }

  .iframe-wrapper {
    box-shadow: 0px 0px 1000px rgb(216 216 216 / 14%);
  }

  iframe {
    max-width: 1280px;
    max-height: 100vh;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>

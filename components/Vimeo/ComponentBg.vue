<template>
  <div
    :class="isVidPlaying ? 'fade-in-video' : ''"
    class="init-vid-fade vimeo-component-bg"
  >
    <div v-if="vidId" ref="vidWrapper" class="vid-wrapper vid-background">
      <client-only>
        <vimeo-player
          class="video-foreground"
          ref="player"
          :key="vidId"
          :video-url="`https://vimeo.com/${vidId}`"
          :video-id="vidId"
          :options="options"
          @ready="onVidReady"
          @playing="onVidPlaying"
        >
        </vimeo-player>
      </client-only>
    </div>
  </div>
</template>

<script>
// https://github.com/dobromir-hristov/vue-vimeo-player

export default {
  props: {
    vidId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      options: {
        controls: false,
        loop: true,
        autoplay: true,
        muted: true,
        portrait: false,
        title: false,
        byline: false,
      },
      isVidPlaying: false,
    };
  },
  methods: {
    onVidLoaded() {
      // console.log("loaded");
    },
    onVidReady() {
      // console.log("ready now");
      // this.isVidReady = true;
      // this.$emit("on-vid-ready");
    },
    onVidPlaying() {
      // console.log("playing now");
      this.isVidPlaying = true;
      // this.$emit("on-vid-playing");
    },
    onVidEnded() {
      // console.log("ended now");
      //   this.activateReplay();
      // this.$emit("on-vid-end");
    },
    onVidTimeUpdate(event, data, player) {
      //   console.log(event, data, player);
    },
  },
};
</script>

<style lang="scss">
.init-vid-fade {
  opacity: 0;
  transition: 1s ease-out all;
}
.fade-in-video {
  opacity: 1;
}
.vimeo-component-bg {
  //   flex: 1;
  padding: 0;
  background: none;
  border-radius: 0;
  margin: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  .video-foreground,
  .vid-background iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  @media (min-aspect-ratio: 16/9) {
    .video-foreground {
      height: 300%;
      top: -100%;
    }
  }
  @media (max-aspect-ratio: 16/9) {
    .video-foreground {
      width: 300%;
      left: -100%;
    }
    @media (max-width: 350px) {
      .video-foreground {
        width: 600%;
        left: -200%;
      }
    }
  }

  iframe {
    max-width: unset;
  }
}
</style>

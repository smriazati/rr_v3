<template>
  <div
    :class="isVidPlaying ? 'fade-in-video' : ''"
    class="init-vid-fade vimeo-component-bg"
  >
    <div v-if="vidId" ref="vidWrapper" class="vid-wrapper vid-background">
      <client-only>
        <!-- <vimeo-player
          class="video-foreground"
          ref="player"
          :key="vidId"
          :video-url="`https://vimeo.com/${vidId}`"
          :video-id="vidId"
          :options="options"
          @ready="onVidReady"
          @playing="onVidPlaying"
        >
        </vimeo-player> -->
        <div class="video-foreground" style="background:#222; color:#fff; display:flex; align-items:center; justify-content:center; width:100%; height:100%;">Vimeo player placeholder</div>
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  vidId: string
}

defineProps<Props>()

const isVidPlaying = ref(false)
const options = {
  controls: false,
  loop: true,
  autoplay: true,
  muted: true,
  portrait: false,
  title: false,
  byline: false,
}

function onVidLoaded() {}
function onVidReady() {}
function onVidPlaying() {
  isVidPlaying.value = true
}
function onVidEnded() {}
function onVidTimeUpdate(event: any, data: any, player: any) {}
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

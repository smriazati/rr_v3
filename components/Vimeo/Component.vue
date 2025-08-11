<template>
  <div class="video-component-container">
    <button class="pauseBtn" @click="togglePlayback">
      <span v-if="isPlaying">
        <LocalizationString :string="labels?.pause" />
      </span>
      <span v-else>
        <LocalizationString :string="labels?.play" />
      </span>
    </button>

    <div :id="vidId" class="vimeo-component" :class="{ playing: isPlaying }" @click="playVid">
      <ClientOnly>
        <div class="iframe-wrapper" v-if="vidId" ref="vidWrapper">
          <vueVimeoPlayer ref="vid" :key="vidId" :video-id="vidId" :options="options" @ready="onVidReady"
            @loaded="onVidLoaded" @playing="onVidPlaying" @pause="onVidPaused" @timeupdate="onVidTimeUpdate"
            @ended="onVidEnded" />
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vueVimeoPlayer } from 'vue-vimeo-player'
const vimeoEl = ref(null)

// Props
const props = defineProps<{
  vidId: string
}>()

// Emits
const emit = defineEmits<{
  (e: 'on-vid-playing', payload: any): void
  (e: 'on-vid-pausing', payload: any): void
  (e: 'on-vid-ended'): void
  (e: 'on-vid-time-update', payload: number): void
}>()

// State
const labels = ref<{ pause: string; play: string } | null>(null)
const options = {
  controls: true,
  loop: false,
  autoplay: false,
  muted: false,
  portrait: false,
  title: false,
  byline: false,
}
const isPlaying = ref(false)


const vidWrapper = ref<HTMLElement | null>(null)
const vid = ref<any>(null) // ref to vueVimeoPlayer component instance

// Fetch labels from sanity (client-only)
const query = groq`*[_type == "settings"]{
  "pause": vidPlaybackLabels.pause,
  "play": vidPlaybackLabels.play
}[0]`

const { data } = await useSanityQuery<{ pause: string; play: string }>(query)
labels.value = data.value || null


function togglePlayback() {
  if (isPlaying.value) {
    pauseVid()
  } else {
    playVid()
  }
}

function playVid() {
  if (!vid.value?.player) return
  isPlaying.value = true
  emit('on-vid-playing', true)
  vid.value.player.play()
  pauseOtherVids()
}

function pauseVid() {
  if (!vid.value?.player) return
  isPlaying.value = false
  emit('on-vid-pausing', false)
  vid.value.player.pause()
}

function pauseOtherVids() {
  const refEl = vid.value?.$el
  if (!refEl) return

  const id = refEl.id
  const container = refEl.closest('div.story')
  if (!container) return

  const otherVids = container.querySelectorAll(
    `[id^='vimeo-player']:not([id='${id}'])`
  )

  otherVids.forEach((el) => {
    const component = el.closest('.vimeo-component')
    const otherIsPlaying = component?.classList.contains('playing')
    if (otherIsPlaying) {
      const pauseBtn = component?.parentElement?.querySelector(
        '.pauseBtn'
      ) as HTMLButtonElement | null
      if (pauseBtn) pauseBtn.click()
    }
  })
}

// Vimeo player event handlers (emit same events as before)
function onVidLoaded(id: any) {

}

function onVidReady() {

}

function onVidPlaying(event: any) {
  if (!isPlaying.value) {
    isPlaying.value = true
  }
  emit('on-vid-playing', event.duration)
}

function onVidPaused() {
  if (isPlaying.value) {
    isPlaying.value = false
  }
  emit('on-vid-pausing', false)
}

function onVidEnded() {
  if (isPlaying.value) {
    isPlaying.value = false
  }
  emit('on-vid-ended')
}

function onVidTimeUpdate(event: any) {
  emit('on-vid-time-update', event.seconds)
}
</script>

<style lang="scss">
@use '~/assets/sass/imports/imports.scss' as *;

.iframe-wrapper>div {
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;
  width: 100%;
}

.vimeo-component .vimeo-component {
  position: relative;
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

  .caption {
    margin-top: 8px;
  }

  @media (min-width: $collapse-bp) {
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

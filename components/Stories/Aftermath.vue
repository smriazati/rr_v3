<template>
  <div class="aftermath-stories">
    <div v-if="content">
      <main ref="contentRef" class="content">
        <div class="row section gsap-fade-in" v-for="item in content" :key="item._key"
          :class="item._type == 'contentImgFull' ? 'dark' : ''">
          <div v-if="item._type == 'contentImgText'">
            <ContentImageText :content="item"></ContentImageText>
          </div>
          <div v-if="item._type == 'contentImgFull'">
            <ContentImageFull :content="item"></ContentImageFull>
          </div>
          <div v-if="item._type == 'contentText'" class="context-text-wrapper">
            <ContentText :content="item"></ContentText>
          </div>
          <div v-if="item._type == 'contentVideo'" class="content-video">
            <ContentVideo :content="item"></ContentVideo>
          </div>
          <div v-if="item._type == 'contentQuote'" class="content-quote">
            <ContentQuote :quote="item"></ContentQuote>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'


const props = defineProps<{
  content: any
}>()

const contentRef = ref<HTMLElement | null>(null)

// Animation function
function setAnim() {
  const sections = contentRef.value.querySelectorAll<HTMLElement>('.section')
  if (!sections.length) return

  sections.forEach((panel, i) => {
    gsap.set(panel, {
      autoAlpha: 0,
      y: 150,
    })

    if (i === 0) {
      gsap.to(panel, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
      })
    } else {
      gsap.to(panel, {
        autoAlpha: 1,
        y: 0,
        scrollTrigger: {
          trigger: panel,
          start: 'top+=150px bottom',
          end: '+=300px',
          scrub: 1.1,
        },
      })
    }
  })
}

onMounted(() => {
  setAnim();
})
</script>
<style lang="scss">
@use '~/assets/sass/imports/imports.scss' as *;

.aftermath-stories blockquote {
  margin-bottom: 60px;

  figcaption {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}

.aftermath-stories .content-quote {
  max-width: 55ch;
  text-align: center;
}

.aftermath-stories {
  @media (max-width: $collapse-bp) {
    .context-text-wrapper {
      padding: 0 30px;
    }
  }
}
</style>
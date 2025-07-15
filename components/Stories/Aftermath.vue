<template>
  <div class="aftermath-stories">
    <div v-if="content">
      <main ref="content" class="content">
        <div class="row section gsap-fade-in" v-for="item in content.sections" :key="item._key"
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
import { ref, watch, nextTick, onMounted } from 'vue'
import groq from 'groq'

interface Props {
  schema: string
}

const props = defineProps<Props>()

const content = ref('')
const contentRef = ref<HTMLElement>()

// Fetch data
const { $sanity } = useNuxtApp()
const fetchData = async () => {
  content.value = await $sanity.fetch(groq`*[_id == "${props.schema}"][0]{
    "sections": content.sections
  }`)
}

// Fetch on client side only
onMounted(() => {
  fetchData()
})

// Watch for content changes and set up animations
watch(content, () => {
  if (content.value !== '') {
    nextTick(() => {
      setAnim()
    })
  }
})

// Animation setup
const setAnim = () => {
  const { $gsap } = useNuxtApp()
  const gsap = $gsap

  if (!contentRef.value) return

  const sections = contentRef.value.querySelectorAll(".section")
  if (!sections) return

  sections.forEach((panel, i) => {
    if (i === 0) {
      gsap.set(panel, {
        autoAlpha: 0,
        y: 150,
      })

      gsap.to(panel, {
        autoAlpha: 1,
        y: 0,
        duration: 1
      })
    } else {
      gsap.set(panel, {
        autoAlpha: 0,
        y: 150,
      })

      gsap.to(panel, {
        autoAlpha: 1,
        y: 0,
        scrollTrigger: {
          trigger: panel,
          start: `top+=150px bottom`,
          end: `+=300px`,
          scrub: 1.1,
        },
      })
    }
  })
}
</script>

<style lang="scss">
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
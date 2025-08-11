<template>
  <div ref="wrapper" class="instruction-modal" tabindex="0" @keydown.esc="closeModal">
    <main class="story-map-intro" v-if="content">
      <header>
        <div>
          <h1>
            <LocalizationString :string="content.title" />
          </h1>
          <h2 v-if="content.subhead">
            <LocalizationString :string="content.subhead" />
          </h2>
        </div>
      </header>

      <div class="button-wrapper">
        <button class="bright flex-col" @click="closeModal">
          <LocalizationString :string="content.ctaText" />
        </button>
      </div>

      <section ref="text" class="text">
        <div class="text-wrapper">
          <LocalizationRte :content="content.instructions" />
        </div>
      </section>

      <section class="featured-quote" v-if="content.quote">
        <ContentQuote :quote="content.quote" />
      </section>

      <footer class="credits">
        <div>
          <p>
            <LocalizationString :string="content.credits" />
          </p>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import groq from 'groq'

// Nuxt 3 composable for Sanity client
const sanity = useSanity()

const schema = 'intro2'
const query = groq`*[_type == "${schema}"][0]`

const content = ref<any>(null)
const wrapper = ref<HTMLElement | null>(null)

// Disable server-side fetching, fetch only on client
onMounted(async () => {
  const data = await sanity.fetch(query)
  if (data) {
    content.value = data
  }

  if (wrapper.value) {
    wrapper.value.focus()
  }
})

const emit = defineEmits<{
  (e: 'close-modal'): void
}>()

function closeModal() {
  emit('close-modal')
}
</script>



<style lang="scss">
@use '~/assets/sass/imports/imports.scss' as *;
@use "sass:color";

@media (max-width: $collapse-bp) {
  .modal-container {
    // height: unset;
    // position: absolute;
    overflow-y: scroll;
  }
}

.modal-container {
  overflow-y: scroll;
  overflow-x: hidden;
}

.instruction-modal {
  outline: 0;

  &:focus {
    outline: 0;
  }
}

.story-map-intro {
  display: grid;
  height: 100%;
  min-height: 100%;
  width: 100%;
  min-width: 100%;
  grid-template-columns: repeat(2, 50vw);
  grid-template-rows: min-content min-content 1fr;
  grid-template-areas:
    "h q"
    "b q"
    "t q"
    "f q";

  @media (max-width: $collapse-bp) {
    display: flex;
    flex-direction: column;
  }

  header,
  section.text,
  footer,
  .button-wrapper {
    background: $gray;

    width: 100%;

    @media (min-width: $collapse-bp) {
      padding-right: 10px;
      padding-left: 30px;
    }

    @media (max-width: $collapse-bp) {
      padding: 15px;
    }

  }

  header,
  section,
  footer,
  .button-wrapper {
    >* {
      max-width: 640px;
      margin-left: auto;
      margin-right: auto;

      @media (max-width: 1280px) {
        max-width: 100%;
      }
    }
  }

  header {
    padding-top: 10vh;
    grid-area: h;

    @media (max-width: $collapse-bp) {
      padding-top: 100px;
    }


    >* {
      display: flex;
      flex-direction: column-reverse;
    }

    h1,
    h2 {
      // text-align: left;
      display: flex;
      justify-self: center;

      @media (max-width: $collapse-bp) {
        text-align: center;
      }
    }

    h1 {
      margin-top: 10px;
      justify-content: center;
      text-align: center;
    }

    h2 {
      text-transform: uppercase;
      font-size: 18px;
      letter-spacing: 2px;
      display: flex;
      justify-content: center;
    }
  }

  .button-wrapper {
    grid-area: b;
  }

  section.featured-quote {
    grid-area: q;
    place-self: center;
    background: color.change(color.adjust($sage, $lightness: -30%),
        $alpha: 0.8);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;

    @media (max-width: $collapse-bp) {
      text-align: center;
      padding: 50px 10px;
    }
  }

  section.text {
    grid-area: t;

    // padding-top: 60px;
    @media (max-width: $collapse-bp) {
      padding: 15px 20px;
    }

    .text-wrapper p:last-child {
      margin-bottom: 0;
    }
  }

  footer {

    grid-area: f;
    height: 100%;
    display: flex;
    // align-items: flex-end;
    padding-top: 30px;
    justify-content: center;

    @media (min-width: $collapse-bp) {
      padding-bottom: 30px;
      text-align: center;
    }

    @media (max-width: $collapse-bp) {
      padding-top: 15px;
    }


    p {
      font-size: 14px;
      line-height: 18px;
      color: color.adjust($gray, $lightness: 80%);
    }
  }

  blockquote {
    @include pBigStyle;

    figcaption {
      margin-top: 30px;
    }
  }
}

.story-map-intro .button-wrapper {
  display: flex;
  justify-content: center;
}
</style>
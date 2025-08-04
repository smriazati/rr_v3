<template>
  <div ref="wrapper" class="modal-wrapper" tabindex="0" @keydown.esc="closeModal">
    <div class="flat close-button" @click="closeModal()">
      <p class="visually-hidden">Close</p>
      <div class="icon icon-close"></div>
    </div>
    <div class="story-container">
      <div class="stories-modal">
        <MapModalsS :activeStoryId="activeStoryId"></MapModalsS>
      </div>
      <button class="inline-close-button bright centered" @click="closeModal()">
        <span v-if="modalCloseBtnText">
          <LocalizationString :string="modalCloseBtnText"></LocalizationString>
        </span>
        <SystemIcon type="arrow" color="light" :width="25" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import groq from 'groq'

const schema = "settings2"
const query = groq`*[_type == "${schema}"]{
  backBtnText
}[0]`

// Props
interface Props {
  activeStoryId: number
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'close-modal': []
}>()

const { data: content } = await useSanityQuery<any>(query)

// Component state
const wrapper = ref<HTMLElement>()
const isCollapsed = ref(false)

// Computed properties
const modalCloseBtnText = computed(() => {
  if (!content.value) return
  if (!content.value.backBtnText) {
    return
  }
  return content.value.backBtnText
})

// Methods
const closeModal = () => {
  emit("close-modal")
}

const initLightbox = () => {
  const boxes = document.querySelectorAll("figure:not(.no-lb)")
  if (!boxes) {
    return
  }
  boxes.forEach((box) => {
    box.classList.add("hover-cursor")
    box.addEventListener("click", () => {
      box.classList.toggle("lightbox-expanded")
    })
  })
}

// Lifecycle
onMounted(() => {
  if (wrapper.value) {
    wrapper.value.focus()
  }
  initLightbox()
})
</script>

<style lang="scss">
@use '~/assets/sass/imports/imports.scss' as *;

.modal-container {
  display: flex;
  position: fixed;
  z-index: 311;
  top: 0;
  left: 0;
  animation: fadeIn 0.3s ease forwards;
  justify-content: center;
  height: calc(100%);
  width: 100%;

  @media (max-width: $collapse-bp) {
    height: 100%;
    height: 100vh;
  }

  &:not(.transparent) {
    background: rgba(0, 0, 0, 0.8);
  }


  figcaption p {
    margin-top: 15px;
    font-size: 16px;
    line-height: 24px;
  }

  .close-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 9;

    &:hover {
      cursor: pointer;
    }
  }

  .modal-wrapper {
    position: relative;
    z-index: 11;
  }
}

.modal-wrapper {
  color: white;
  border: 0;
  outline: 0;
  height: 100%;
  overflow-y: scroll;

  &:not(.transparent) {
    background: black;
  }

  &:not(.full-width) {
    width: 1280px;
    max-width: 1280px;
    padding: 100px 30px;
  }

  &.full-width {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media (max-width: 1280px) {
    width: 90%;
    max-width: 90%;
  }

  h1,
  h2,
  h3 {
    text-align: center;
  }
}

.wrapper:focus {
  outline: 0;
  border: none;
}

.stories-modal {
  main.content>.row.title {
    padding: 0 0 0 0;
  }

  main.content>.row:last-child {
    padding-bottom: 100px;
  }

  main.content>.row blockquote {
    max-width: 40ch;
    @include pBigStyle();
  }
}
</style>
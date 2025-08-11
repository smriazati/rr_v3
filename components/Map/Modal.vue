<template>
  <div ref="wrapper" class="modal-wrapper" tabindex="0" @keydown.esc="closeModal">
    <div class="flat close-button" @click="closeModal">
      <p class="visually-hidden">Close</p>
      <div class="icon icon-close"></div>
    </div>
    <div class="story-container">
      <div class="stories-modal">
        <MapModalsS :activeStoryId="activeStoryId" />
      </div>
      <button class="inline-close-button bright centered" @click="closeModal" style="display:flex;">
        <span v-if="modalCloseBtnText">
          <LocalizationString :string="modalCloseBtnText" />
        </span>
        <SystemIcon type="arrow" color="light" :width="25" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Props
defineProps({
  activeStoryId: {
    type: Number,
    required: true
  }
})

// Emits
const emit = defineEmits(['close-modal'])

// Constants and refs
const query = groq`*[_type == "settings2"]{ backBtnText }[0]`

const { data: content } = await useSanityQuery(query)

const wrapper = ref(null)

onMounted(async () => {
  if (wrapper.value) {
    wrapper.value.focus()
  }

  initLightbox()
})

// Computed for modalCloseBtnText
const modalCloseBtnText = computed(() => {
  if (!content.value) return
  if (!content.value.backBtnText) return
  return content.value.backBtnText
})

// Methods
function closeModal() {
  emit('close-modal')
}

function initLightbox() {
  const boxes = document.querySelectorAll('figure:not(.no-lb)')
  if (!boxes) return
  boxes.forEach(box => {
    box.classList.add('hover-cursor')
    box.addEventListener('click', () => {
      box.classList.toggle('lightbox-expanded')
    })
  })
}
</script>

<style lang="scss">
@use '~/assets/sass/imports/imports.scss' as *;

.inline-close-button {
  display: flex;

  >span:first-child {
    padding-right: 0;
  }
}

.story-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

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
  display: flex;
  flex-direction: column;
  justify-content: center;

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

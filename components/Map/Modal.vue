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


<script>

import { groq } from '@nuxtjs/sanity'
const schema = "settings2"
const query = groq`*[_type == "${schema}"]{
  backBtnText
}[0]`


export default {
  data: () => ({
    content: '',
    isCollapsed: false,
  }),
  async fetch() {
    this.content = await this.$sanity.fetch(query)
  },
  fetchOnServer: false,
  props: {
    activeStoryId: {
      type: Number,
      required: true,
    }
  },
  mounted() {
    const wrapper = this.$refs.wrapper;

    if (wrapper) {
      wrapper.focus();
    }
    this.initLightbox();
    // this.setAnim();
  },
  computed: {
    modalCloseBtnText() {
      if (!this.content) { return }
      if (!this.content.backBtnText) {
        return
      }
      return this.content.backBtnText
    }
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    initLightbox() {
      const boxes = document.querySelectorAll("figure:not(.no-lb)");
      if (!boxes) {
        return;
      }
      // console.log(boxes);
      boxes.forEach((box) => {
        box.classList.add("hover-cursor");
        box.addEventListener("click", () => {
          box.classList.toggle("lightbox-expanded");
        });
      });
    },
  },
};
</script>


<style lang="scss">
.modal-container {
  display: flex;
  position: fixed;
  z-index: 311;
  top: 0;
  left: 0;
  animation: fadeIn 0.3s ease forwards;
  justify-content: center;
  height: calc(100%);

  @media (max-width: $collapse-bp) {
    height: 100%;
    height: 100vh;
  }

  &:not(.transparent) {
    background: rgba(0, 0, 0, 0.8);
  }

  width: 100%;

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
  &:not(.transparent) {
    background: black;
  }

  // background: black;
  color: white;

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

  border: 0;
  outline: 0;

  @media (max-width: 1280px) {
    width: 90%;
    max-width: 90%;
  }

  height: 100%;
  overflow-y: scroll;

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

// @media (max-width: $mobile-bp) and (orientation: landscape) {
//   .story-container .image-wrapper figure {
//     // max-height: 80vh;
//     overflow: hidden;
//     display: flex;
//     flex-direction: column;

//     img {
//       flex: 0 0 400px;
//       object-fit: contain;
//       overflow: hidden;
//     }
//   }
// }

// .story-container {
//   display: grid;
//   max-width: 1000px;
//   margin: 0 auto;
//   grid-template-columns: minmax(200px, 50ch) 2fr;
//   // @media (min-width: 1280px) {
//   //   grid-template-columns: 1fr 2fr;
//   // }
//   grid-gap: 30px;

//   .image-wrapper {
//     figure {
//       margin-bottom: 30px;
//     }
//   }

//   @media (max-width: $mobile-bp) {
//     display: flex;
//     flex-direction: column;
//   }
// }

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
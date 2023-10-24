<template>
  <div ref="wrapper" :class="name" class="text-scroller-page">
    <h1 class="visually-hidden">{{ name }}</h1>
    <div class="scroll-progress-bar-wrapper">
      <ScrollProgressBar :height="wrapperHeight" :fullHeight="true" />
    </div>
    <div class="wrapper">
      <div class="image-zoom-wrapper">
        <LocalizationImageZoomer :height="wrapperHeight" :img="bgImg"></LocalizationImageZoomer>
      </div>
      <div class="text-scroller-wrapper" v-if="panels">
        <SystemTextScroller :panels="panels" @scrolled-to-end="showPagination()" />
      </div>
      <div v-show="isPaginationVisible">
        <div v-if="nav">
          <Pagination v-if="nav?.next" link="/intro/stories" :message="nav.next" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { groq } from '@nuxtjs/sanity'
const schema = "landing1"
const query = groq`*[_type == "${schema}"][0]`

export default {
  asyncData({ $sanity }) {
    const content = $sanity.fetch(query)
    return content
  },

  data() {
    return {
      name: "introduction",
      isPaginationVisible: false,
      wrapperHeight: null,
    };
  },
  head() {
    return {
      title: this.$setPageTitle(this.pageMetadata)
    }
  },
  mounted() {
    this.setWrapperHeight();
    window.addEventListener(
      "resize",
      () => {
        this.setWrapperHeight();
      },
      false
    );
  },
  unmounted() {
    window.removeEventListener(
      "resize",
      () => {
        this.setWrapperHeight();
      },
      false
    );
  },
  methods: {
    setWrapperHeight() {
      if (!this.panels) { return }
      this.wrapperHeight = window.innerHeight * this.panels.length;
    },
    showPagination() {
      this.isPaginationVisible = true;
    },
    hidePagination() {
      this.isPaginationVisible = false;
    },
  },
};
</script>

<style lang="scss">
.introduction {
  &.text-scroller-page .wrapper .nuxt-content p {
    background: transparent !important;
  }

  &.text-scroller-page>.wrapper {
    background: rgba(10, 10, 10, 0.4);
  }

  @media (max-width: $collapse-bp) {
    .text-scroller .panel:last-child {
      padding-bottom: 100px;
    }

    .pagination {
      position: fixed;
      bottom: 0;
      width: 100%;
    }
  }
}
</style>
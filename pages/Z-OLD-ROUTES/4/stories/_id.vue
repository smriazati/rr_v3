<template>
  <div :class="name" class="story stories-individual" ref="story">
    <div class="page-grid">
      <div class="title">
        <StoryTitle :subjectId="`subject${this.$route.params.id}`" :sectionId="sectionId" />
      </div>
      <div class="slider-controls">
        <button @click="goToPrev()" class="flat">
          <span class="visually-hidden">Prev</span>
          <SystemIcon type="arrow" color="light" :width="25" class="icon icon-arrow-left" />
        </button>
        <div class="slide-counter">
          <ul>
            <li v-for="index in slideNum" :key="index" class="link-hover"
              :class="activeSlide === index - 1 ? 'active-slide' : ''" @click="goToSlide(index)">
              <span class="visually-hidden">{{ index }}</span>
            </li>
          </ul>
        </div>
        <button @click="goToNext()" class="flat">
          <span class="visually-hidden">Next</span>
          <SystemIcon type="arrow" color="light" :width="25" />
        </button>
      </div>

      <div class="story" ref="theStory">
        <StoriesAftermath :schema="`story4_${this.$route.params.id}`"></StoriesAftermath>
      </div>

      <!-- <div class="story" v-if="this.$route.params.id === '1'" ref="theStory">
        <StoriesAftermath1 />
      </div>
      <div class="story" v-if="this.$route.params.id === '2'" ref="theStory">
        <StoriesAftermath2 />
      </div>
      <div class="story" v-if="this.$route.params.id === '3'" ref="theStory">
        <StoriesAftermath3 />
      </div> -->
    </div>
    <div class="pagination-row flex-row" v-show="isPaginationVisible">
      <Pagination link="/4/stories" :message="nav?.prev" :back="true" />
      <Pagination link="/5" :message="nav?.next" />
    </div>
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'
const schema = "settings4"
const query = groq`*[_type == "${schema}"][0]{
  nav
}`



export default {
  asyncData({ $sanity }) {
    const nav = $sanity.fetch(query)
    return nav
  },
  data() {
    return {
      name: "aftermath-stories-individual",
      sectionId: "aftermath",
      isPaginationVisible: false,
      pageNames: {
        1: "Aftermath: Luba Chomut",
        2: "Aftermath: Yosef Zilberberg",
        3: "Aftermath: Mania Schwartzman",
      },
      activeSlide: 0,
      activeSlideClass: "active-slide",
      previousActiveSlide: null,
      slideNum: null,
    };
  },
  head() {
    return {
      title: this.pageNames[this.$route.params.id],
    };
  },
  mounted() {
    this.initSlider();
  },
  watch: {
    activeSlide() {
      this.pauseActiveVids();
      const activeSlideClass = this.activeSlideClass;
      const activeSlideEl = document.querySelector(
        `.slide-${this.activeSlide}`
      );
      activeSlideEl?.classList.add(activeSlideClass);

      const previousActiveSlideEl = document.querySelector(
        `.slide-${this.previousActiveSlide}`
      );
      previousActiveSlideEl?.classList.remove(activeSlideClass);
      // console.log(previousActiveSlideEl, activeSlideEl);

      if (this.activeSlide === this.slideNum - 1) {
        this.isPaginationVisible = true;
      }
    },
  },
  methods: {
    pauseActiveVids() {
      let activeVid = document.querySelector(".vimeo-component.playing");
      if (activeVid) {
        let pauseBtn = activeVid.querySelector(".pauseBtn");
        console.log(pauseBtn);
        if (pauseBtn) {
          pauseBtn.click();
        }
      }
    },
    initSlider() {
      const parent = this.$refs.story;

      const main = parent.querySelector("main.content");
      if (!main) { return }
      main.classList.add("slider-wrapper");

      const slides = Array.from(main.children);
      this.slideNum = slides.length;

      slides.forEach((slide, i) => {
        slide.classList.add("slide");
        slide.classList.add(`slide-${i}`);

        if (i === 0) {
          slide.classList.add(this.activeSlideClass);
        }
      });
    },
    goToNext() {
      // console.log("going to next");

      this.previousActiveSlide = this.activeSlide;
      if (this.activeSlide === this.slideNum - 1) {
        this.activeSlide = 0;
      } else {
        this.activeSlide = this.activeSlide + 1;
      }
    },
    goToPrev() {
      // console.log("going to prev");
      this.previousActiveSlide = this.activeSlide;
      if (this.activeSlide === 0) {
        this.activeSlide = this.slideNum - 1;
      } else {
        this.activeSlide = this.activeSlide - 1;
      }
    },
    goToSlide(index) {
      this.previousActiveSlide = this.activeSlide;
      // console.log(index - 1);
      this.activeSlide = index - 1;
      // console.log(this.activeSlide);
    },
  },
};
</script>



<style lang="scss">
.aftermath-stories.stories-individual {
  .page-grid {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 54px);
    width: 100%;
    position: absolute;
    top: 0;

    .story-title-container {
      grid-gap: 0;
      grid-column-gap: 15px;

      @media (max-width: $collapse-bp) {
        grid-row-gap: 15px;
      }

      .text-wrapper {
        padding: 0;
      }

      .banner {
        @media (max-width: $collapse-bp) {
          grid-row: 1 / 4;
        }
      }

      .image-wrapper {
        max-width: 150px;
        justify-self: end;
        width: 100%;
        height: 100%;
        overflow: hidden;
        grid-row: 1 / 4;
        position: relative;
        z-index: 1000;

        @media (max-width: $collapse-bp) {
          place-self: center;
          grid-row: 1 / 2;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }

    .slider-controls {
      // position: fixed;
      // bottom: 54px;
      width: 100%;
      height: 54px;
      background: $sage;
      display: flex;
      justify-content: center;
      margin-top: -25px;

      @media (max-width: $collapse-bp) {
        z-index: 10;
      }

      .slide-counter {
        padding: 15px 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      ul {
        display: flex;
        padding: 10px;
        list-style: none;

        >*:not(:last-child) {
          margin-right: 15px;
        }

        li {
          display: flex;
          justify-content: center;
          align-items: center;

          &:before {
            content: " ";
            width: 10px;
            height: 10px;
            display: block;
            border-radius: 3px;
            background: #fff;
            transition: 0.3s ease all;
          }

          &.active-slide {
            &:before {
              background: $gray;
            }

            &:hover {
              cursor: default;
            }
          }
        }
      }

      .icon.light {
        &:hover {
          filter: grayscale(1) invert(0) brightness(90);
        }
      }

      ul li:hover::before {
        background: $gray;
      }
    }

    .story {
      flex: 100%;
      padding: 54px 0 79px 0;
      @include siteContainerBig(400);

      main.content {
        height: 100%;

        >.row {
          position: absolute;
          top: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;

          .vimeo-component {
            flex: 100%;
            width: 100%;
            height: 100%;
          }

          &.slide {
            &:not(.active-slide) {
              display: none;
            }

            &.active-slide {
              opacity: 0;
              animation: fadeIn 0.3s ease-in forwards;
            }
          }

          figure.banner img {
            max-height: 60vh;
          }

          .row {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }

  div.pagination {
    @media (max-width: $collapse-bp) {
      margin-top: 30px;
    }
  }

  nav.pagination {
    top: 100px;
    bottom: unset;

    .wrapper {
      background: darken($sage, 10);

      &:hover {
        background: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
</style>

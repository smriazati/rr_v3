<template>
  <div ref="page" :class="name" class="page">
    <h1 class="visually-hidden">{{ name }}</h1>
    <div class="scroll-progress-bar-wrapper">
      <ScrollProgressBar :height="wrapperHeight" />
    </div>
    <ScrollHint />
    <main ref="grid">
      <div ref="pin" class="pin">
        <header>
          <div class="content-wrapper" v-if="featuredQuote">
            <div class="bg-image" v-if="featuredQuote.bgImg">
              <LocalizationImage :img="featuredQuote.bgImg"></LocalizationImage>
            </div>
            <div class="text-wrapper center" v-if="featuredQuote.quote">
              <ContentQuote :quote="featuredQuote.quote"></ContentQuote>
            </div>
          </div>
        </header>
        <section class="monuments">
          <div class="row" v-if="section1">
            <div class="text-wrapper" v-if="section1.text">
              <p class="grid-intro-text">
                <LocalizationString :string="section1.text"></LocalizationString>
              </p>
            </div>
            <div class="left image-wrapper" v-if="section1.img1">
              <LocalizationImage :img="section1.img1"></LocalizationImage>
            </div>

            <div class="under image-wrapper" v-if="section1.img2">
              <LocalizationImage :img="section1.img2"></LocalizationImage>
            </div>
          </div>
        </section>
        <section class="unmarked">
          <div class="row">
            <div class="text-wrapper" v-if="section2.text">
              <p class="grid-intro-text">
                <LocalizationString :string="section2.text"></LocalizationString>
              </p>
            </div>
            <div class="left image-wrapper" v-if="section2.img1">
              <LocalizationImage :img="section2.img1"></LocalizationImage>
            </div>
          </div>
        </section>
      </div>
      <footer ref="footer" v-if="conclusion">
        <ConclusionEnd :content="conclusion" />
      </footer>
    </main>
  </div>
</template>

<script>

import { groq } from '@nuxtjs/sanity'
const schema = "intro5"
const query = groq`*[_type == "${schema}"][0]`

export default {
  asyncData({ $sanity }) {
    const content = $sanity.fetch(query)
    return content
  },
  data() {
    return {
      name: "conclusion",
      wrapperHeight: null,
    };
  },
  mounted() {
    this.setWrapperHeight();
    this.setContentAnimation();
    this.setPinningAnimation();
    window.addEventListener("resize", () => {
      this.setWrapperHeight();
      this.setContentAnimation();
      this.setPinningAnimation();
    });
  },
  unmounted() {
    window.removeEventListener("resize", () => {
      this.setWrapperHeight();
      this.setContentAnimation();
      this.setPinningAnimation();
    });
  },
  methods: {
    setWrapperHeight() {
      this.wrapperHeight = this.$refs.page.offsetHeight;
    },

    setPinningAnimation() {
      const ScrollTrigger = this.$ScrollTrigger;
      const pin = this.$refs.pin;
      const footer = this.$refs.footer;
      // console.log(pin, footer);
      ScrollTrigger.create({
        trigger: pin,
        pin: pin,
        pinSpacing: false,
        // markers: true,
        start: `bottom bottom`,
        endTrigger: footer,
        end: `bottom bottom`,
      });
    },
    setContentAnimation() {
      const gsap = this.$gsap;
      const grid = this.$refs.grid;
      const header = grid.querySelector("header");
      const monuments = grid.querySelector("section.monuments");
      const unmarked = grid.querySelector("section.unmarked");

      // First Row
      const monumentsC1 = monuments.querySelector(".text-wrapper");
      const monumentsC2 = monuments.querySelector(".image-wrapper.left");
      const monumentsC3 = monuments.querySelector(".image-wrapper.under");

      const scrub = 1.1;
      const xDistance = 300;
      const filterStart = "grayscale(1) brightness(0.3) contrast(3)";
      const filterEnd = "grayscale(0) brightness(1) contrast(1)";

      gsap.set(monumentsC1, {
        autoAlpha: 0,
        x: xDistance,
      });

      gsap.to(monumentsC1, {
        autoAlpha: 1,
        x: 0,
        scrollTrigger: {
          trigger: header,
          start: `bottom-=${window.innerHeight / 2} top`,
          end: `bottom-=${window.innerHeight / 6} top`,
          scrub: scrub,
        },
      });

      gsap.set(monumentsC2, {
        autoAlpha: 0,
        x: xDistance * -1,
        filter: filterStart,
      });

      gsap.to(monumentsC2, {
        autoAlpha: 1,
        x: 0,
        filter: filterEnd,
        scrollTrigger: {
          trigger: header,
          start: `bottom-=${window.innerHeight / 3} top`,
          end: `bottom-=${window.innerHeight / 6} top`,
          scrub: scrub,
          // markers: true,
        },
      });

      gsap.set(monumentsC3, {
        autoAlpha: 0,
        x: xDistance,
        filter: filterStart,
      });

      gsap.to(monumentsC3, {
        autoAlpha: 1,
        x: 0,
        filter: filterEnd,
        scrollTrigger: {
          trigger: header,
          start: `bottom-=${window.innerHeight / 3} top`,
          end: `bottom-=${window.innerHeight / 6} top`,
          scrub: scrub,
          // markers: true,
        },
      });

      // Second Row

      const unmarkedC1 = unmarked.querySelector(".text-wrapper");
      const unmarkedC2 = unmarked.querySelector(".image-wrapper");
      gsap.set(unmarkedC1, {
        autoAlpha: 0,
        x: -300,
      });
      gsap.to(unmarkedC1, {
        autoAlpha: 1,
        x: 0,
        scrollTrigger: {
          trigger: monuments,
          start: `bottom-=${window.innerHeight / 2} top`,
          end: `bottom-=${window.innerHeight / 4} top`,
          scrub: 0.8,
          // markers: true,
        },
      });

      gsap.set(unmarkedC2, {
        autoAlpha: 0,
        // x: 300,
        filter: "grayscale(1) brightness(0.3) contrast(3)",
      });
      gsap.to(unmarkedC2, {
        autoAlpha: 1,
        // x: 0,
        filter: "grayscale(0) brightness(1) contrast(1)",

        scrollTrigger: {
          trigger: monuments,
          start: `bottom-=${window.innerHeight / 3} top`,
          // end: `bottom-=${window.innerHeight / 6} top`,
          scrub: 0.8,
          // markers: true,
        },
      });
    },
  },
};
</script>

<style lang="scss">
@mixin conclusionGrid() {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 1280px;
  max-width: 1280px;
  margin: 0 auto;
  grid-template-rows: auto;
  grid-gap: 15px;
  grid-column-gap: 30px;
  padding: 0 30px;

  @media (max-width: 1280px) {
    width: 85%;
    width: 85vw;
    max-width: 85%;
    max-width: 85vw;
    padding: 0;
  }
}

.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;

  figure {
    width: 100%;
    height: 100%;

    img {
      min-width: 100%;
      width: 100%;
      max-height: 100%;

      min-height: 100%;
      //   height: 100%;
      object-fit: cover;
      opacity: 0.6;
    }

    figcaption {
      position: absolute;
      top: 0;
      right: 0;
      padding: 30px;
      width: 50%;
      text-align: right;
    }
  }
}

.conclusion.page {

  p,
  blockquote {
    @include pBigStyle();
  }

  blockquote {
    @media (max-width: $nav-bp) {
      font-size: 30px;
      line-height: 38px;
    }
  }

  .content-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: $collapse-bp) {
      height: calc(100vh);
    }

    @media (max-width: $collapse-bp) {
      height: 100vh;
    }

    width: 100%;
    overflow: hidden;

    @media (max-width: $collapse-bp) {
      padding-top: 60px;
    }
  }

  .text-wrapper figure {
    margin: 0;
    min-width: 100%;

    img {
      width: 100%;
    }

    figcaption {
      display: flex;
      justify-content: center;
      padding-top: 15px;
    }
  }

  section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    .row {
      @include conclusionGrid;
    }

    &.monuments {
      .row {
        padding-top: 20vh;

        .text-wrapper {
          grid-row: 3 / 4;
          grid-column: 5 / span 3;
          padding-top: 20%;
          padding-bottom: 100px;

          @media (max-width: 960px) {
            padding-top: 0;
            padding-bottom: 0;
            grid-column: 1 / span 8;
          }
        }

        .image-wrapper.left {
          grid-row: 2 / 6;
          grid-column: 1 / 5;

          @media (max-width: 960px) {
            grid-column: 1 / span 8;
            grid-row: 4 / 5;
          }
        }

        .image-wrapper.under {
          grid-row: 5 / 6;
          grid-column: 5 / span 4;

          @media (max-width: 960px) {
            grid-column: 1 / span 8;
          }
        }
      }
    }

    &.unmarked {
      padding-bottom: 15vh;

      .row {
        .text-wrapper {
          grid-row: 6 / 7;
          grid-column: 1 / 4;
          place-self: end;

          @media (max-width: 960px) {
            grid-column: 1 / span 8;
          }
        }

        .image-wrapper {
          grid-row: 6 / 7;
          grid-column: 4 / span 5;

          @media (max-width: 960px) {
            grid-column: 1 / span 8;
            grid-row: 7 / 8;
          }
        }
      }
    }
  }

  footer {
    position: relative;
    z-index: 900;
    padding-top: 25vh;
  }
}
</style>
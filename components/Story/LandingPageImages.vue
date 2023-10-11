<template>
  <div class="story-landing-page-images">
    <div class="text-wrapper center call-out">
      <h2 v-if="title" class="collapsed-mb text-center">
        <LocalizationString :string="title">
        </LocalizationString>
      </h2>
      <p v-if="subtitle" class="small">
        <LocalizationString :string="subtitle">
        </LocalizationString>
      </p>
    </div>
    <div class="image-wrapper flex-row align-center">
      <nuxt-link class="image-col" v-for="(item, key, index) in subjects" :key="index"
        :to="`/${sectionIndex}/stories/${index + 1}`">
        <figure class="">
          <div class="img">
            <LocalizationImageNoCaption :img="item.img"></LocalizationImageNoCaption>
          </div>
          <figcaption>
            <LocalizationString :string="item.name"></LocalizationString>
          </figcaption>
        </figure>
      </nuxt-link>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex";

import { groq } from '@nuxtjs/sanity'
const schema = "subjects"
const query = groq`*[_type == "${schema}"]{
  subject1, subject2, subject3
}[0]`


export default {
  async fetch() {
    this.subjects = await this.$sanity.fetch(query)
  },
  data: () => ({
    subjects: ''
  }),
  props: {
    sectionIndex: {
      type: Number,
      required: true,
    },
    subtitle: {
      type: Object,
    },
    title: {
      type: Object,
    },
  },
  mounted() {
    this.setAnimation();
  },
  methods: {
    setAnimation() {
      const gsap = this.$gsap;
      const ScrollTrigger = this.$ScrollTrigger;
      const figures = gsap.utils.toArray(".image-col");
      if (!figures) {
        return;
      }
      figures.forEach((figure, i) => {
        const img = figure.querySelector("img");
        const caption = figure.querySelector("figcaption");
        // console.log(img);
        const captionDelay = 0.3;
        const itemDelay = i * 0.5;

        gsap.set(img, {
          autoAlpha: 0,
          y: 50,
          scale: 0.9,
        });
        gsap.set(caption, {
          autoAlpha: 0,
          scale: 0.9,
          // y: -50,
        });

        gsap.to(img, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          delay: itemDelay,
          duration: 1,
          ease: "power2.out",
        });

        gsap.to(caption, {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          y: 0,
          ease: "power2.out",
          delay: itemDelay + captionDelay,
        });
      });
    },
  },
};
</script>

<style lang='scss'>
// set anim
.story-landing-page-images {

  img,
  figcaption {
    opacity: 0;
  }
}

.story-landing-page-images {
  h2 span {
    justify-content: center;
  }
}

.story-landing-page-images {
  .flex-row {
    @media (max-width: $mobile-bp) {
      flex-direction: row;
    }

    @media (max-width: $xs-bp) {
      flex-direction: column;
    }
  }

  .call-out {
    margin-bottom: 2rem;
    max-width: 50ch;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    background: rgba($gray, 0.6);

    >*:last-child {
      margin-bottom: 0;
    }
  }

  figure:hover,
  a:hover {
    text-decoration: none;

    figure,
    figcaption {
      text-decoration: none;
    }
  }

  .image-wrapper {
    >* {
      margin-right: 2%;
      text-align: center;
    }

    figure {
      display: flex;
      flex-direction: column;

      .img {
        img {
          position: relative;
          z-index: 10;

          @media (min-width: $collapse-bp) {
            filter: blur(1px) grayscale(1) brightness(0.9);
          }

          // opacity: 0.3;
          transition: 3s ease filter;
        }
      }

      figcaption {
        position: relative;
        z-index: 9;
        flex: 0 0 80px;
        margin-top: 0.5rem;
        font-size: 24px;
        line-height: 30px;
        transition: 0.3s ease all;
        display: flex;
        justify-content: center;
      }

      &:hover {
        img {
          filter: blur(0px) grayscale(0) brightness(1);
          opacity: 1;
          // transform: scale(1);
        }
      }
    }
  }

  .image-col {
    &:hover {
      figcaption {
        color: lighten($sage, 30);
      }
    }
  }
}
</style>
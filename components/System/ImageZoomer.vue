<template>
  <figure class="image-zoomer">
    <div class="image-zoomer" ref="imageZoomer">
      <img :src="src" :alt="alt" />
    </div>
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      required: false,
    },
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
  },
  watch: {
    height() {
      this.setAnim();
    },
  },
  mounted() {
    this.setAnim();
  },
  methods: {
    setAnim() {
      // console.log("setting animation with", this.height);
      const gsap = this.$gsap;
      const img = this.$refs.imageZoomer;
      gsap.set(img, {
        scale: 3,
        autoAlpha: 0.2,
      });
      if (this.height) {
        gsap.to(img, {
          scale: 1,
          autoAlpha: 1,
          scrollTrigger: {
            trigger: img,
            start: "top top",
            end: `+=${this.height}px`,
            scrub: 1.5,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss">
.image-zoom-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  .image-zoomer {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      min-height: 100%;
      object-fit: cover;
    }
    figcaption {
      position: absolute;
      top: 0px;
      right: 0px;
      padding: 30px;
      text-align: right;
    }
  }
}
</style>
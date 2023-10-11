<template>
  <div class="scroll-progress-bar" ref="scrollProgressBar"></div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
    },
    fullHeight: {
      type: Boolean,
    },
  },
  mounted() {
    this.setAnim();
  },
  watch: {
    height() {
      this.setAnim();
    },
  },
  methods: {
    setAnim() {
      const gsap = this.$gsap;
      const ref = this.$refs.scrollProgressBar;
      let heightOffset = 54;
      if (this.fullHeight) {
        heightOffset = 0;
      }
      gsap.to(ref, {
        height: "100vh",
        scrollTrigger: {
          trigger: ref,
          start: "top top",
          end: `+=${this.height - window.innerHeight - heightOffset}px`,
          scrub: 1.1,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.scroll-progress-bar-wrapper {
  position: fixed;
  width: 25px;
  top: 0;
  left: 0px;
  z-index: 22;
  @media (max-width: $mobile-bp) {
    width: 10px;
  }
}
.scroll-progress-bar {
  background: $sage; // sage for hard light;
  mix-blend-mode: hard-light;
}

.introduction .scroll-progress-bar-wrapper {
  mix-blend-mode: difference;
}
</style>
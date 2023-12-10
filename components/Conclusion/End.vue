<template>
  <div class="conclusion-ending-slide">
    <!-- <div class="bg-image">
      <img src="/icons/tree.svg" alt="Tree icon" />
    </div> -->
    <div class="text-wrapper centered">
      <p v-if="content.title" class="h1">
        <LocalizationString :string="content.title"></LocalizationString>
      </p>
      <p class="small" v-if="content.subhead">
        <LocalizationString :string="content.subhead"></LocalizationString>
      </p>
      <nav>
        <button ref="button" class="light full-width" v-if="content.btnText">
          <nuxt-link :to="{ path: '/', query: $route.query }">
            <LocalizationString :string="content.btnText"></LocalizationString>
          </nuxt-link>
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    }
  },
}
</script>
<style lang="scss">
.conclusion.page .conclusion-ending-slide {
  margin-top: 25vh;
  background: #192912;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;


  &:before {
    content: "";
    background-image: url(/icons/tree.svg);
    background-repeat: no-repeat;
    background-position: center;
    filter: grayscale(0.9) blur(3px) brightness(2);
    opacity: 0.3;
    position: absolute;
    height: 150%;
    width: 100%;
    top: -5%;

    @media (max-width: $collapse-bp) {
      top: -25%;
    }
  }

  .text-wrapper {
    position: relative;

    .h1 {
      font-size: 72px;
      line-height: 80px;
      font-weight: 700;
      letter-spacing: 2%;

      @media (max-width: $collapse-bp) {
        font-size: 30px;
        line-height: 30px;
      }
    }

    p:not(.h1) {
      max-width: 55ch;
      margin: 0 auto;

      @media (max-width: $collapse-bp) {
        font-size: 18px;
        line-height: 22px;
      }
    }
  }
}
</style>
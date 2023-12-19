<template>
  <div class="conclusion-ending-slide">
    <div class="bg-image">
      <img src="/icons/tree.svg" alt="Tree icon" />
    </div>
    <div class="text-wrapper centered">
      <p v-if="content.title" class="h1">
        <LocalizationString :string="content.title"></LocalizationString>
      </p>
      <p class="small" v-if="content.subhead">
        <LocalizationString :string="content.subhead"></LocalizationString>
      </p>
      <nav>
        <button ref="button" class="bright full-width" v-if="content.btnText">
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
  background: #f5f5f5;
  padding-top: 400px;
  height: 100vh;
  max-height: 100vh;
  padding-bottom: 25%;

  padding-bottom: 25vh;
  // @media (min-width: $collapse-bp) {
  //   margin-bottom: 54px;
  // }
  position: relative;

  .bg-image {
    opacity: 0.3;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      filter: grayscale(1) brightness(3);
      object-fit: cover;
    }
  }

  .text-wrapper {
    position: relative;
  }

  p {
    color: $gray;
    display: flex;
    justify-content: center;

    &.small {
      @include pStyle($gray);
    }
  }

  @media (max-width: 960px) {
    padding-top: 50vh;
    padding-bottom: 60px;

    button.align-left {
      margin: 0 auto;
    }
  }
}
</style>
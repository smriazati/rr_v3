<template>
  <div :class="name">
    <div class="grid">
      <header v-if="main">
        <h1>
          <LocalizationString :string="main.title"></LocalizationString>
        </h1>
      </header>
      <section class="text" v-if="main">
        <div class="text-wrapper">
          <p>
            <LocalizationString :string="main.paragraph1"></LocalizationString>
          </p>
          <h2>
            <LocalizationString :string="main.subhead"></LocalizationString>
          </h2>
          <p>
            <LocalizationString :string="main.paragraph2"></LocalizationString>
          </p>
        </div>
      </section>
      <section class="call-out-wrapper" v-if="question">
        <div class="call-out text-wrapper">
          <h2 class="collapsed-mb subheadline">
            <LocalizationString :string="question.title"></LocalizationString>
          </h2>
          <p class="big">
            <LocalizationString :string="question.question"></LocalizationString>
          </p>
          <h3 class="subheadline">
            <LocalizationString :string="question.subtitle"></LocalizationString>
          </h3>
          <p>
            <LocalizationString :string="question.subtext"></LocalizationString>
          </p>
        </div>
      </section>
    </div>
    <div>
      <div v-if="nav">
        <Pagination v-if="nav?.next" link="/aftermath" :message="nav.next" />
      </div>
    </div>
  </div>
</template>

<script>

import { groq } from '@nuxtjs/sanity'
const schema = "talkback3"
const query = groq`*[_type == "${schema}"][0]`

export default {
  asyncData({ $sanity }) {
    const content = $sanity.fetch(query)
    return content
  },
  data() {
    return {
      name: "resistance-talkback",
      galleryCount: 12,
    };
  },
  head() {
    return {
      title: this.$setPageTitle(this.pageMetadata)
    }
  },
};
</script>

<style lang="scss">
.resistance-talkback {
  width: 100%;
  height: 100%;
  min-height: 100vh;

  @media (min-width: $collapse-bp) {
    min-width: 100vw;
  }

  h1 {
    margin-bottom: 15px;
  }

  .text-wrapper h2:not(.collapsed-mb),
  .text-wrapper h3:not(.collapsed-mb) {
    margin-bottom: 15px;
  }

  .flex-col {
    margin-bottom: 30px;
  }

  .grid {
    display: grid;
    height: 100%;

    @media (min-width: $collapse-bp) {
      min-height: 100vh;
    }

    width: 100%;
    min-width: 100%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: "h q" "t q";

    >* {
      padding: 30px;

      >* {
        max-width: 640px;
        margin-left: auto;
        margin-right: auto;
      }
    }

    @media (max-width: $collapse-bp) {
      display: flex;
      flex-direction: column;
      padding-top: 60px;

      >* {
        width: 100%;
      }
    }
  }

  header {
    grid-area: h;
    align-self: end;

    h1 {
      margin: 0;
    }
  }

  section.text {
    padding-top: 0;
    grid-area: t;

    .text-wrapper {
      @media (max-width: $collapse-bp) {
        p:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  section.call-out-wrapper {
    grid-area: q;
    place-self: center;
    background: rgba($forest, 0.8);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    p.big {
      @include pBigStyle();
    }
  }

  .pagination {
    @media (max-width: $collapse-bp) {
      margin-top: 30px;
    }
  }
}
</style>
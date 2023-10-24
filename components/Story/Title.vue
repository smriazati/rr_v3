<template>
  <header ref="header" class="story-title-wrapper">
    <div>
      <div class="banner"></div>
      <div class="text-wrapper">
        <h2 class="subheadline collapsed-mb" v-if="activeSection">
          <LocalizationString :string="activeSection.title"></LocalizationString>
        </h2>
        <h1 class="collapsed-mb" v-if="activeSubject">
          <LocalizationString :string="activeSubject?.name">
          </LocalizationString>
        </h1>
      </div>
      <div class="image-wrapper" v-if="activeSubject">
        <LocalizationImageNoCaption :img="activeSubject.image" :size="150"></LocalizationImageNoCaption>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";

import { groq } from '@nuxtjs/sanity'
const query = groq`
{
  "settings": *[_id == "settings"][0]{
    "sections": siteNavLabels.sections
  },
  "subjects": *[_id == "subjects"][0]{
    subject1, subject2, subject3
  }
}
`

export default {
  async fetch() {
    this.content = await this.$sanity.fetch(query)
  },
  data: () => ({
    content: ''
  }),
  props: {
    subjectId: {
      type: String,
    },
    sectionId: {
      type: String,
    }
  },
  computed: {
    ...mapState("localization", {
      activeLanguage: (state) => state.activeLanguage,
    }),
    activeSection() {
      const section = {
        title: ''
      }
      if (!this.sectionId) { return section }
      if (!this.content.settings) { return section }
      if (!this.content.settings.sections) { return section }

      section.title = this.content.settings.sections[this.sectionId]
      return section
    },
    activeSubject() {
      const subject = {
        name: '',
        image: ''
      }
      if (!this.subjectId) { return subject }
      if (!this.content.subjects) { return subject }
      subject.name = this.content.subjects[this.subjectId]?.name
      subject.image = this.content.subjects[this.subjectId]?.img
      return subject
    },
  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style lang="scss">
.story-title-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding-top: 24px;
  position: relative;
  color: #fff;

  * {
    position: relative;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 75%;
    background: #000;
  }

  h1,
  h2,
  figure {
    display: flex;
    justify-content: center;
  }
}
</style>
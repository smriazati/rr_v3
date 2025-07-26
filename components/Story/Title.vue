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

<script setup lang="ts">
import { ref, computed } from 'vue'
import groq from 'groq'

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

// Props
interface Props {
  subjectId?: string
  sectionId?: string
}

const props = defineProps<Props>()

const { data: content } = await useSanityQuery<any>(query)

// Pinia store
const localizationStore = useLocalizationStore()

// Computed properties
const activeLanguage = computed(() => localizationStore.activeLanguage)

const activeSection = computed(() => {
  const section = {
    title: ''
  }
  if (!props.sectionId) return section
  if (!content.value?.settings) return section
  if (!content.value.settings.sections) return section

  section.title = content.value.settings.sections[props.sectionId]
  return section
})

const activeSubject = computed(() => {
  const subject = {
    name: '',
    image: ''
  }
  if (!props.subjectId) return subject
  if (!content.value?.subjects) return subject
  subject.name = content.value.subjects[props.subjectId]?.name
  subject.image = content.value.subjects[props.subjectId]?.img
  return subject
})
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
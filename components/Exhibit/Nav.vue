<template>
  <div class="exhibit-nav">
    <button :class="isExpanded ? 'expanded' : 'collapsed'" class="flat" @click="toggleMenu"
      aria-label="Toggle exhibit navigation">
      <ExhibitNavToggleButton />
    </button>

    <nav :class="isExpanded ? 'expanded' : 'collapsed'" class="exhibit-nav-wrapper" ref="navWrapper">
      <LocalizationLanguagePicker />
      <ul ref="navLinks" v-if="sections" class="nav-links">
        <li v-for="(item, index) in sections" :key="index"
          :class="activeSectionKey === sectionsArr[index] ? 'active' : ''" @click="toggleMenu">
          <NuxtLink :to="{ path: `/${sectionsArr[index]}`, query: route.query }">
            <LocalizationString :string="item" />
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { LocalizedString } from '~/types/sanity'

const schema = 'settings'
const query = groq`*[_type == "${schema}"]{ "sections": siteNavLabels.sections }[0]`

// Use Nuxt 3 Sanity composable to fetch data
const { data } = useSanityQuery<{ sections?: Record<string, LocalizedString> }>(query)

const isExpanded = ref(false)
const navWrapper = ref<HTMLElement | null>(null)
const navLinks = ref<HTMLElement | null>(null)
const sectionsArr = ['intro', 'occupation', 'resistance', 'aftermath', 'conclusion']

const route = useRoute()

function toggleMenu() {
  isExpanded.value = !isExpanded.value
}

const activeSectionKey = computed(() => {
  const path = route.path
  for (const key of sectionsArr) {
    if (path.includes(key)) return key
  }
  return ''
})

const sections = computed(() => {
  if (!data.value || !data.value.sections) return null

  // Create array ordered by sectionsArr keys
  const orderedSections: LocalizedString[] = []
  for (const key of sectionsArr) {
    if (key in data.value.sections) {
      orderedSections.push(data.value.sections[key])
    }
  }
  return orderedSections
})

onMounted(() => {
  if (navLinks.value) {
    const links = navLinks.value.querySelectorAll('li')
    links.forEach((link) => {
      link.addEventListener('click', () => {
        isExpanded.value = false
      })
    })
  }
})
</script>

<style lang="scss" scoped>
@use '~/assets/sass/imports/imports.scss' as *;

.exhibit-nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  @media (min-width: 300px) {
    min-width: 300px;
  }

  >button {
    position: fixed;
    z-index: 999;
    top: 20px;
    left: 20px;
    filter: invert(1);
  }
}

.exhibit-nav-wrapper {
  position: fixed;
  overflow: auto;
  z-index: 111;
  background: #31572A;
  height: 100%;

  @media (max-width: $collapse-bp) {
    width: 100%;
  }

  padding: 70px 20px;

  @media (min-width: $collapse-bp) {
    padding-top: 90px;
  }

  display: flex;
  flex-direction: column;

  &.collapsed {
    transform: translateX(-100vw);
    transition: transform 0.3s ease;
  }

  &.expanded {
    transform: translateX(0);
    transition: transform 0.3s ease;
  }

  .nav-links {
    li {
      padding: 15px;

      @media (max-height: 500px) {
        padding: 5px 15px;
      }

      background: #31572A;
      transition: 0.3s ease all;

      &:hover,
      &.active {
        background: #000;

        a {
          color: #fff;
        }
      }
    }

    li a {
      color: #fff;
      text-transform: uppercase;
    }

    li.main a {
      font-size: 24px;
      font-weight: bold;
    }

    li.secondary a {
      font-size: 18px;
    }
  }
}

.exhibit-nav .language-picker-wrapper {
  padding: 15px;
  background: #070707;
  margin-bottom: 30px;

  @media (max-height: 500px) {
    margin-bottom: 15px;
  }
}
</style>

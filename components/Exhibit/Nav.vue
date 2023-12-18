<template>
  <div class="exhibit-nav">
    <button :class="isExpanded ? 'expanded' : 'collapsed'" class="flat" @click="toggleMenu">
      <ExhibitNavToggleButton></ExhibitNavToggleButton>
    </button>

    <nav :class="isExpanded ? 'expanded' : 'collapsed'" class="exhibit-nav-wrapper" ref="navWrapper">
      <LocalizationLanguagePicker></LocalizationLanguagePicker>
      <ul ref="navLinks" v-if="sections" class="nav-links">
        <li v-for="(item, index) in sections" :key="index" :class="activeSectionKey == sectionsArr[index] ? 'active' : ''"
          @click="toggleMenu">
          <nuxt-link :to="{ path: `/${sectionsArr[index]}`, query: $route.query }">
            <LocalizationString :string="item"></LocalizationString>
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { groq } from '@nuxtjs/sanity'
const schema = "settings"
const query = groq`*[_type == "${schema}"]{
  "sections": siteNavLabels.sections
}[0]`

export default {
  async fetch() {
    this.content = await this.$sanity.fetch(query)
  },
  fetchOnServer: false,
  data: () => ({
    content: '',
    sectionsArr: ["intro", "occupation", "resistance", "aftermath", "conclusion"],
    isExpanded: false,
  }),

  computed: {
    ...mapState("exhibitNav", {
      isExhibitNavVisible: (state) => state.isExhibitNavVisible,
    }),
    activeSectionKey() {
      const path = this.$route.path;
      const sections = this.sectionsArr.slice();
      let activeSectionKey = "";
      sections.forEach(item => {
        if (path.includes(item)) {
          activeSectionKey = item;
        }
      })
      return activeSectionKey;
    },
    sections() {
      if (!this.content) { return null }
      if (!this.content.sections) { return null }
      // sort intro, occupation, resistance, aftermath, conclusion
      const orderedKeys = this.sectionsArr;
      const sections = [];
      const sectionsToSort = this.content.sections;
      for (const key in sectionsToSort) {
        if (sectionsToSort.hasOwnProperty(key)) {
          if (key === orderedKeys[0]) {
            sections[0] = sectionsToSort[key];
          }
          if (key === orderedKeys[1]) {
            sections[1] = sectionsToSort[key];
          }
          if (key === orderedKeys[2]) {
            sections[2] = sectionsToSort[key];
          }
          if (key === orderedKeys[3]) {
            sections[3] = sectionsToSort[key];
          }
          if (key === orderedKeys[4]) {
            sections[4] = sectionsToSort[key];
          }
        }
      }
      return sections
    }
  },
  methods: {
    toggleMenu() {
      this.isExpanded = !this.isExpanded;
    },
  },
  mounted() {
    const nav = this.$refs.navLinks;
    if (nav) {
      const links = nav.querySelectorAll("li");
      if (links) {
        links.forEach((link) => {
          link.addEventListener("click", () => {
            this.isExpanded = false;
          });
        });
      }
    }

  },
};
</script>

<style lang="scss">
.exhibit-nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}

.exhibit-nav>button {
  position: fixed;
  z-index: 999;
  top: 20px;
  left: 20px;
  filter: invert(1);
}

.exhibit-nav-wrapper {
  position: fixed;
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

  .nav-links {
    li {
      padding: 15px;
      background: #31572A;
      transition: .3s ease all;

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
}

.exhibit-nav nav {

  &.collapsed {
    transform: translateX(-100vw);
  }
}
</style>

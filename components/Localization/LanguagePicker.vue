<template>
    <div v-if="showLanguagePicker" class="language-picker-wrapper">
      <div class="dropdown-active" @click="toggleDropdown">
        {{ labelMap[activeLanguage] }} ▾
      </div>
      <ul v-show="isExpanded" class="dropdown-options">
        <li
          v-for="lang in langs"
          :key="lang"
          :class="{ active: lang === activeLanguage }"
        >
          <button class="flat" @click="selectLanguage(lang)">
            {{ labelMap[lang] }}
          </button>
        </li>
      </ul>
    </div>
  </template>


<script setup lang="ts">
import { ref, computed } from 'vue'


// 1) Dropdown state
const isExpanded = ref(false)
const toggleDropdown = () => { isExpanded.value = !isExpanded.value }

// 2) Show/hide picker from CMS
const query = groq`*[_type == "settings"]{ showLanguagePicker }[0]`
const { data } = await useSanityQuery<{ showLanguagePicker: boolean }>(query)
const showLanguagePicker = computed(() => data.value?.showLanguagePicker ?? true)

// 3) Your store-based locale
const { activeLanguage, setActiveLanguage } = useLocalization()

// 4) The three codes you support
const langs = ['en','es','uk'] as const

// 5) Human-friendly labels
const labelMap: Record<typeof langs[number], string> = {
  en: 'English',
  es: 'Español',
  uk: 'українська'
}

// 6) When the user picks one, just update the store—nothing else
const selectLanguage = (lang: typeof langs[number]) => {
  setActiveLanguage(lang)
  isExpanded.value = false
}
</script>

<style lang="scss">
.language-picker-wrapper .label,
.language-picker-wrapper button {
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 0.03em;
    color: #fff;

    &:hover {
        cursor: pointer;
    }
}

.language-picker-wrapper .dropdown-wrapper .dropdown-options.hide {
    display: none;
}

.language-picker-wrapper {
    .dropdown-active .wrapper {
        display: flex;
        align-items: center;

        .label {
            margin-right: 10px;
        }
    }

    ul {
        list-style: none;
        margin-top: 10px;

        >*:not(:last-child) {
            margin-bottom: 10px;
        }

        li {
            display: flex;
            align-items: center;

            span {
                margin-right: 10px;
            }
        }

        li.active button {
            font-weight: bold;
        }
    }
}

.arrow-down {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 9px solid #fff;
}
</style>
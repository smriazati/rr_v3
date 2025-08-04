<template>
    <div v-if="showLanguagePicker" class="home-language-picker-wrapper">
      <div class="dropdown-active" @click="toggleDropdown">
        {{ labelMap[activeLanguage] }} ▾
      </div>
      <ul :class="isExpanded ? 'show' : 'hide'" class="dropdown-options">
        <li
          v-for="lang in langs"
          :key="lang"
          :class="{ active: lang === activeLanguage }"
        >
          <button class="flat" @click="selectLanguage(lang)">
            <span>
              <img 
                :src="`/images/flag_${lang}.svg`" 
                :alt="labelMap[lang] + ' flag'" 
                height="30" 
              />
            </span>
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
  
  // 3) Store-based locale
  const { activeLanguage, setActiveLanguage } = useLocalization()
  
  // 4) Supported codes & labels
  const langs = ['en', 'uk'] as const
  const labelMap: Record<typeof langs[number], string> = {
    en: 'English',
    uk: 'українська',
  }
  
  // 5) On select: update store, close dropdown
  const selectLanguage = (lang: typeof langs[number]) => {
    setActiveLanguage(lang)
    isExpanded.value = false
  }
  </script>
  

<style lang="scss">
.home-language-picker-wrapper .label,
.home-language-picker-wrapper button {
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 0.03em;
    color: #fff;

    &:hover {
        cursor: pointer;
    }
}

.home-language-picker-wrapper .dropdown-wrapper .dropdown-options.hide {
    display: none;
}

.home-language-picker-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    padding: 20px;

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
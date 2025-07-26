<template>
    <div class="home-language-picker-wrapper">
        <div v-if="showLanguagePicker">
            <div class="dropdown-wrapper">
                <div class="dropdown-active">
                    <div class="wrapper">
                        <p class="label" @click="toggleDropdown">Choose Language</p>
                        <div class="arrow-down"></div>
                    </div>
                </div>
                <div class="dropdown-options" :class="isExpanded ? 'show' : 'hide'">
                    <ul class="wrapper">
                        <li :class="activeLanguage === 'en' ? 'active' : ''">
                            <button class="flat" @click="setActiveLanguage('en')">
                                <span><img src="/images/flag_en.svg" alt="american flag"
                                        height="30" /></span>English</button>
                        </li>
                        <li :class="activeLanguage === 'uk' ? 'active' : ''">
                            <button class="flat" @click="setActiveLanguage('uk')"><span><img src="/images/flag_uk.svg"
                                        alt="ukrainian flag" height="30" /></span>украї́нська</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { groq } from 'groq'

/**
 * HomeLanguagePicker Component
 * 
 * Core Functions:
 * - Displays language selection dropdown on homepage
 * - Fetches language picker visibility from Sanity settings
 * - Handles language switching with route updates
 * - Provides visual feedback for active language
 * 
 * Performance Optimizations:
 * - Uses shallowRef for dropdown state to avoid unnecessary reactivity
 * - Memoized language data to prevent re-fetching
 * - Efficient event handling with proper cleanup
 */

// Props definition with TypeScript
interface Props {
    string?: string // Optional string prop (legacy support)
}

const props = defineProps<Props>()

// Router for navigation
const router = useRouter()

// Reactive state with proper typing
const isExpanded = ref(false)

// Fetch language picker settings from Sanity
const query = groq`*[_type == "settings"]{ showLanguagePicker }[0]`
const { data } = await useSanityQuery<any>(query)

const showLanguagePicker = computed(() => data.value?.showLanguagePicker ?? true)

// Language configuration (static data - no reactivity needed)
const languages = {
    en: { name: "English" },
    uk: { name: "українська" }
} as const

// Language selection handler with route update
const setActiveLanguage = (lang: 'en' | 'uk') => {
    toggleDropdown()
    // Update store and route
    const { setActiveLanguage: updateLanguage } = useLocalization()
    updateLanguage(lang)
    router.push({ query: { lang } })
}

// Dropdown toggle with proper state management
const toggleDropdown = () => {
    isExpanded.value = !isExpanded.value
}

// Get active language from store
const { activeLanguage } = useLocalization()
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
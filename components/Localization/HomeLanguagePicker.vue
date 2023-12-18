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


<script>

import { mapState } from "vuex";
import { groq } from '@nuxtjs/sanity'



export default {
    async fetch() {
        const query = groq`*[_type == "settings"]{
          showLanguagePicker
        }[0]`
        const data = await this.$sanity.fetch(query)
        this.showLanguagePicker = data.showLanguagePicker
    },
    fetchOnServer: false,
    props: {
        string: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            showLanguagePicker: true,
            isExpanded: false,
            languages: {
                "en": {
                    "name": "English"
                },
                "uk": {
                    "name": "украї́нська"
                }
            }
        }
    },
    computed: {
        ...mapState("localization", {
            activeLanguage: (state) => state.activeLanguage,
        }),
    },
    methods: {
        setActiveLanguage(lang) {
            this.toggleDropdown();
            this.$store.commit("localization/setActiveLanguage", lang);
            this.$router.push({ query: { lang: lang } });
        },
        toggleDropdown() {
            this.isExpanded = !this.isExpanded;
        }
    },
};
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
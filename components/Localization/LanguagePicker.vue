<template>
    <div class="language-picker-wrapper">
        <div>
            <div class="dropdown-wrapper">
                <div class="dropdown-active">
                    <div class="wrapper">
                        <span class="label" @click="toggleDropdown">{{ languages[activeLanguage].name }}</span>
                        <button @click="toggleDropdown" class="flat">
                            <SystemIcon type="arrow" color="light" :width="15" />
                        </button>
                    </div>
                </div>
                <div class="dropdown-options" :class="isExpanded ? 'show' : 'hide'">
                    <ul class="wrapper">
                        <li>
                            <button class="flat" @click="setActiveLanguage('en')">English</button>

                        </li>
                        <li>
                            <button class="flat" @click="setActiveLanguage('uk')">украї́нська</button>
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
const schema = "settings"
const query = groq`*[_type == "${schema}"]{
  showLanguagePicker
}[0]`


export default {
    data: () => ({
        showLanguagePicker: '',
        isExpanded: false
    }),
    async fetch() {
        const data = await this.$sanity.fetch(query)
        if (!data) { return }
        if (!data.showLanguagePicker) { return }
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
.dropdown-wrapper {
    display: flex;
    flex-direction: column;

    margin-bottom: 30px;

    .dropdown-active {
        display: inline-flex;

        .wrapper {
            display: flex;
            align-items: stretch;
            color: #000;

            .label {
                background: white;
                border: 1px solid black;
                font-size: 24px;
                text-transform: uppercase;
                font-weight: 800;
                padding: 15px 15px;
            }

            button {
                background: #000;
                border: 1px solid black;

                border-radius: 0;
                padding: 15px 15px;

                img {
                    transform: rotate(90deg)
                }

                .icon {
                    padding-left: 0;
                }
            }
        }
    }

    .dropdown-options {
        display: flex;
        margin-top: -1px;

        &.hide {
            display: none;
        }

        .wrapper {
            background: #eaeaea;
            border: 1px solid black;
            padding: 15px;

            @media (min-width: $collapse-bp) {
                flex: 0 0 100%;
            }

            @media (max-width: $collapse-bp) {
                flex: 0 0 200px;
            }

            >*:not(:last-child) {
                margin-bottom: 15px;
            }

        }


        button {
            font-size: 18px;
        }
    }
}
</style>
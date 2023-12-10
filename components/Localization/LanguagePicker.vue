<template>
    <div class="language-picker-wrapper">
        <div v-if="showLanguagePicker">
            <div class="menu-wrapper" :class="isExpanded ? 'show' : 'hide'">
                <div>
                    <ul>
                        <li>
                            <button :class="activeLanguage === 'en' ? 'active' : ''"
                                @click="setActiveLanguage('en')">English</button>

                        </li>
                        <li>
                            <button :class="activeLanguage === 'uk' ? 'active' : ''"
                                @click="setActiveLanguage('uk')">украї́нська</button>
                        </li>
                    </ul>
                    <button @click="toggleCollapse" class="close flat visually-hidden">
                        <img src="/icons/close.svg" alt="close icon" />
                    </button>
                </div>
            </div>
            <div :class="!isExpanded ? 'show' : 'hide'">
                <button @click="toggleCollapse" class="flat open">
                    <span v-if="isExpanded">
                        <img src="/icons/close.svg" alt="close icon" />
                    </span>
                    <span v-else>
                        <img src="/icons/language.svg" alt="language picker icon" />
                    </span>
                </button>
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
    props: {
        string: {
            type: String,
            required: false,
        },
    },
    computed: {
        ...mapState("localization", {
            activeLanguage: (state) => state.activeLanguage,
        }),
    },
    methods: {
        setActiveLanguage(lang) {
            this.$store.commit("localization/setActiveLanguage", lang);
            this.$router.push({ query: { lang: lang } });
        },
        toggleCollapse() {
            this.isExpanded = !this.isExpanded;
        }
    },
};
</script>

<style lang="scss">
.language-picker-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;

    button {
        color: #fff;
        position: relative;
    }

    // .hide {
    //     // display: none;
    //     transform: translateX(100vw);
    // }

    .menu-wrapper {
        transform: translateX(-100vw);
        transition: .3s ease all;

        &.show {
            transform: translateX(0vw);
        }
    }

    .menu-wrapper {
        background: black;
        padding: 1rem;
        height: 100%;
        width: 300px;
        text-align: left;
        position: fixed;
        top: 0;
        left: 0;

        >div {
            margin-top: 40px;

        }
    }

    p {
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 1px;
        // border-bottom: 1px solid white;
        display: inline-block;
        margin-bottom: 20px;
    }

    ul {
        list-style: none;
        padding: 0;

        li {
            background: #000;
            transition: .3s ease all;

            // &:hover {
            //     background: $sage;
            // }
        }

        li button {
            display: flex;
            justify-content: flex-start;
            margin: 0;
            padding: 10px;
            margin: 10px 0;

            &.active {
                background: $sage;
            }
        }

    }

    .open {
        width: 20px;
        height: 20px;
        top: 15px;
        left: 15px;
        filter: invert(1);
        display: flex;

        img {
            display: flex;
        }
    }
}
</style>
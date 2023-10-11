<template>
    <div>
        <div class='language-picker' v-if="showLanguagePicker">
            <p>Select your language</p>
            <button :class="activeLanguage === 'en' ? 'active' : ''" @click="setActiveLanguage('en')">English</button>
            <button :class="activeLanguage === 'uk' ? 'active' : ''" @click="setActiveLanguage('uk')">украї́нська
                мо́ва</button>
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
        },
    },
};
</script>

<style lang="scss">
.language-picker {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: black;
    padding: 1rem;

    button {
        margin: 1rem 0;
        background: transparent;

        &.active {
            color: $sage;
        }

        &:hover {
            background: transparent;
        }
    }
}
</style>
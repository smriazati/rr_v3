<template>
    <footer ref="warning">
        <div v-if="data" class="landing-page-footer">
            <p class="small muted mb-0" v-if="data.warning">
                <LocalizationString :string="data.warning"></LocalizationString>
            </p>
            <div class="logo-wrapper" v-if="data.logos">
                <ul>
                    <li v-for="item in data.logos" :key="item._key">
                        <span v-if="item.img">
                            <a :href="item.link" target="_blank">
                                <LocalizationImageNoCaption :img="item.img"></LocalizationImageNoCaption>
                            </a>
                        </span>
                    </li>
                </ul>
            </div>
        </div>

    </footer>
</template>


<script>

import { groq } from '@nuxtjs/sanity'
const schema = "intro0"
const query = groq`*[_type == "${schema}"]{
    logos, warning
}[0]`


export default {
    data: () => ({
        data: ''
    }),
    async fetch() {
        this.data = await this.$sanity.fetch(query)
    }
};
</script>
<style lang="scss">
.landing-page-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 15px;

    >*:first-child {
        flex: 0 0 50ch;

    }

    >* {
        &:not(:last-child) {
            margin-right: 1rem;
        }
    }

    @media (min-width: $collapse-bp) {
        position: fixed;
        bottom: 0;
        left: 0;
    }

    @media (max-width: $collapse-bp) {
        margin-top: 30px;
    }

    width: 100%;
    background: $gray;
    z-index: 112;

    p {
        color: $white;
        font-size: 14px;
        line-height: 20px;
    }

    ul {
        list-style: none;
    }

    .logo-wrapper {
        ul {
            display: flex;

            >*:not(:last-child) {
                margin-right: 2rem;
            }
        }

        img {
            max-height: 50px;
        }
    }
}
</style>
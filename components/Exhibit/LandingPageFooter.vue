<script setup lang="ts">
import type { LocalizedString } from '~/types/sanity'

interface FooterLogo {
    _key: string
    link?: string
    img?: any // you can replace `any` with your actual Sanity image schema type if known
}

interface FooterData {
    warning?: LocalizedString
    logos?: FooterLogo[]
}

const query = groq`*[_type == "intro0"]{ logos, warning }[0]`
const { data } = useSanityQuery<FooterData>(query)
console.log(data)
</script>
<template>
    <footer ref="warning">
        <div v-if="data" class="landing-page-footer">
            <p class="small muted mb-0" v-if="data.warning">
                <LocalizationString :string="data.warning" />
            </p>

            <div class="logo-wrapper" v-if="data.logos">
                <ul>
                    <li v-for="item in data.logos" :key="item._key">
                        <span v-if="item.img">
                            <a :href="item.link" target="_blank" rel="noopener">
                                <LocalizationImageNoCaption :img="item.img" />
                            </a>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use '~/assets/sass/imports/imports.scss' as *;

.landing-page-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    width: 100%;
    background: $gray;
    z-index: 112;

    >* {
        &:not(:last-child) {
            margin-right: 1rem;
        }
    }

    @media (min-width: 50ch) {
        >*:first-child {
            flex: 0 0 50ch;
        }
    }

    @media (min-width: $collapse-bp) {
        position: fixed;
        bottom: 0;
        left: 0;
    }
}

p {
    color: $white;
    font-size: 14px;
    line-height: 20px;
}

ul {
    list-style: none;
}

/* Use deep selector so styles apply inside child components */
.logo-wrapper ::v-deep ul {
    display: flex;

    >*:not(:last-child) {
        margin-right: 2rem;
    }
}

.logo-wrapper ::v-deep img {
    max-height: 50px;
}

.logo-wrapper {
    @media (max-width: $collapse-bp) {
        margin-top: 15px;
    }
}
</style>
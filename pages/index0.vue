<template>
    <div :class="name">
        <div ref="bg" class="bg-image">
            <img src="/images/01/bgimg.jpg" alt="Painting of figure walking into a forest" />
        </div>
        <header class="flex-col align-center">
            <div class="logo-wrapper">
                <SystemLogo />
            </div>
            <div class="text-wrapper centered">
                <h1 class="subheadline collapsed-mb">
                    <div v-if="subhead">
                        <LocalizationString :string="subhead"></LocalizationString>
                    </div>
                </h1>
                <h2 class="h1 collapsed-mb">
                    <div v-if="title">
                        <LocalizationString :string="title"></LocalizationString>
                    </div>
                </h2>
            </div>
            <button ref="button" class="bright full-width">
                <nuxt-link to="/1/">
                    <div v-if="ctaText">
                        <LocalizationString :string="ctaText"></LocalizationString>
                    </div>
                </nuxt-link>
            </button>
        </header>

        <footer ref="warning" class="content-warning">
            <div class="text-wrapper centered">
                <p>
                    <span v-if="warning">
                        <LocalizationString :string="warning"></LocalizationString>
                    </span>
                </p>
            </div>
        </footer>
    </div>
</template>

<script>

import { groq } from '@nuxtjs/sanity'
const schema = "intro0"
const query = groq`*[_type == "${schema}"][0]`

export default {
    asyncData({ $sanity }) {
        const content = $sanity.fetch(query)
        return content
    },
    data() {
        return {
            name: "home",
        };
    },
    head() {
        return {
            title: this.name.charAt(0).toUpperCase() + this.name.slice(1),
        };
    },

};
</script>

<style lang="scss">
.home {
    width: 100%;
    height: 100%;
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: $collapse-bp) {
        justify-content: space-between;
    }

    .bg-image {
        width: 100%;
        max-width: 100vw;
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;

        @media (min-width: $collapse-bp) {
            max-height: 100vh;
        }

        * {
            width: 100%;
            height: 100%;
        }

        img {
            transform: scale(3);
            opacity: 0.4;
            filter: blur(5px);
        }
    }

    header {
        @media (max-width: $collapse-bp) {
            margin-top: 30px;
        }

        opacity: 0;
        animation: fadeIn 0.8s ease-in forwards;
        position: relative;
        border-radius: 6px;
        overflow: hidden;
        box-shadow: 0 0 30px #303030d6;

        .logo-wrapper {
            margin: 0 auto;
            // margin-right: 30px;
            background: rgba($gray, 0.6);
            width: 100%;
            padding: 30px;
            padding-bottom: 0;

            figure {
                max-width: 250px;
                margin-left: auto;
                margin-right: auto;
            }
        }

        .text-wrapper {
            background: rgba($gray, 0.6);
            padding: 30px;

            @media (min-width: $collapse-bp) {
                * {
                    white-space: nowrap;
                }
            }

            @media (max-width: $collapse-bp) {
                width: 100%;
                min-width: 100%;
            }
        }

        button.full-width {
            width: 100%;
            margin: 0;
            border-radius: 0;
            text-align: center;
            display: flex;
            justify-content: center;
            background: $forest;

            &:hover {
                background: $sage;
            }
        }
    }

    footer {
        padding: 1rem;

        p {
            margin: 0;
        }
    }
}

.content-warning {
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
        font-size: 16px;
        line-height: 22px;
    }
}
</style>


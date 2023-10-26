<template>
    <div class="stories-subjects-wrapper" id="stories">
        <div class="content-wrapper">
            <div class="text-wrapper">
                <h2 v-if="title" class="h1 title collapsed-mb">
                    <LocalizationString :string="title">
                    </LocalizationString>
                </h2>
                <p v-if="subtitle" class="small">
                    <LocalizationString :string="subtitle">
                    </LocalizationString>
                </p>
            </div>
            <div class="card-row">
                <nuxt-link class="card" v-for="(item, key, index) in subjects" :key="index"
                    :to="{ path: `/${routeSection}/stories/${index + 1}`, query: $route.query }">
                    <figure class="image-wrapper">
                        <div class="img">
                            <LocalizationImageNoCaption :img="item.img"></LocalizationImageNoCaption>
                        </div>
                        <figcaption>
                            <LocalizationString :string="item.name"></LocalizationString>
                        </figcaption>
                    </figure>
                    <div class="button-wrapper">
                        <button ref="button" class="dark full-width" v-if="subjectCTA">
                            <nuxt-link :to="{ path: `/${routeSection}/stories/${index + 1}`, query: $route.query }">
                                <span>
                                    <LocalizationString :string="subjectCTA"></LocalizationString>
                                </span>
                            </nuxt-link>
                        </button>
                    </div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
  
<script>

import { groq } from '@nuxtjs/sanity'
const schema = "subjects"
const query = groq`*[_type == "${schema}"]{
    subject1, subject2, subject3
  }[0]`


export default {
    async fetch() {
        this.subjects = await this.$sanity.fetch(query)
    },
    data: () => ({
        subjects: ''
    }),
    props: {
        subtitle: {
            type: Object,
        },
        title: {
            type: Object,
        },
        subjectCTA: {
            type: Object
        },
        route: {
            type: String
        }
    },
    computed: {
        routeSection() {
            if (!this.$route) { return }
            if (!this.$route.name) { return }
            const routeName = this.$route.name
            const routeKey = routeName.substr(0, routeName.indexOf('-'))
            return routeKey
        }
    }
};
</script>
  
<style lang="scss" >
.subject-name {
    display: flex;

    >*:not(:last-child) {
        margin-right: 6px;
    }
}

.stories-subjects-wrapper {
    background: #000;
    padding: 10% 10px;
    text-align: center;

    .content-wrapper {
        max-width: 1080px;
        margin: 0 auto;

        .text-wrapper {
            text-align: left;

            h2 {
                justify-content: flex-start;
            }
        }
    }

    p {
        display: flex;
        font-size: 16px;
        line-height: 20px;
    }

    .card-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        >*:not(:last-child) {
            margin-right: 30px;
        }
    }

    .card {
        background: #1F1F1F;

        border-radius: 36px;
        padding: 30px 10px;

        img {
            transform: scale(1);
            transition: 1s ease-out all;
            filter: grayscale(1)
        }

        overflow: hidden;

        &:hover {
            text-decoration: none;

            span,
            * {
                text-decoration: none;
            }

            img {
                transform: scale(1.08);
                filter: grayscale(0);
            }
        }

        figure {
            display: flex;
            flex-direction: column-reverse;

            figcaption {
                display: flex;
                justify-content: center;
                font-size: 26px;
                line-height: 30px;
                margin-bottom: 20px;
            }
        }

        button {
            margin-top: -30px;
        }
    }
}
</style>
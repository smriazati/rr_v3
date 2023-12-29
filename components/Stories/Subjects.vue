<template>
    <div class="stories-subjects-wrapper" id="stories">
        <div class="content-wrapper">
            <div class="header-wrapper">
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
                <nuxt-link :class="`card card-${index + 1}`" v-for="(item, key, index) in subjects" :key="index"
                    :to="{ path: `/${routeSection}/stories/${index + 1}`, query: $route.query }">
                    <figure class="image-wrapper">
                        <div class="img">
                            <LocalizationImageNoCaption :img="item.img" :size="500"></LocalizationImageNoCaption>
                        </div>
                        <figcaption>
                            <LocalizationString :string="item.name"></LocalizationString>
                        </figcaption>
                    </figure>
                    <!-- <div class="button-wrapper">
                        <div>
                            <nuxt-link :to="{ path: `/${routeSection}/stories/${index + 1}`, query: $route.query }">
                                <span v-if="subjectCTA">
                                    <LocalizationString :string="subjectCTA"></LocalizationString>
                                </span>
                                <span v-else>
                                    <span>Read more</span>
                                </span>
                            </nuxt-link>
                        </div>
                    </div> -->
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
    fetchOnServer: false,
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
    },
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
    min-width: 100%;
    width: 100%;
    padding-right: 30px;

    h1,
    .h1 {
        font-size: 48px;
        line-height: 52px;
    }

    .header-wrapper {
        margin-bottom: 30px;

        h2 {
            margin-bottom: 5px;

        }

        p.small {
            font-size: 16px;
            font-style: italic;
        }

        span {
            text-align: center;
            justify-content: center;
        }
    }

    figcaption {
        margin-top: 15px;

        span {
            justify-content: center;
            text-align: center;
            font-size: 18px;
            line-height: 22px;
            letter-spacing: 0.04em;

            // @media (max-width: 830px) {
            //     font-size: 14px;
            //     line-height: 16px;
            // }

            text-transform: uppercase;
        }
    }
}

.card-row {
    display: flex;
    justify-content: center;

    >*:not(:last-child) {
        margin-right: 15px;
    }

    @media (max-width: 830px) {
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        >* {
            flex: 0 0 300px;
            margin-bottom: 30px;
        }
    }
}

// card animations
@keyframes slideIn {
    0% {
        transform: translateY(5px);
        opacity: 0;
    }

    100% {
        transform: translateY(0px);
        opacity: 1;
    }
}

.card {
    transform: translateY(5px);
    opacity: 0;
}

.card-1 {
    animation: 2s ease-in forwards slideIn;
}

.card-2 {
    animation: 2s .3s ease-in forwards slideIn;
}

.card-3 {
    animation: 2s .55s ease-in forwards slideIn;
}
</style>
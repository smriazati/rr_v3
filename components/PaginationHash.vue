<template>
    <nav ref="pagination" class="pagination" :class="back ? 'back-btn' : ''">
        <div class="tree-icon">
            <img src="/icons/tree.svg" alt="" />
        </div>
        <nuxt-link :to="{ path: link, hash: `#${hash}`, query: $route.query }" class="wrapper">
            <h3 v-if="!back" class="subheadline">
                <span v-if="activeLanguage == 'en'">
                    {{ labels.next?.en }}
                </span>
                <span v-if="activeLanguage == 'uk'">
                    {{ labels.next?.uk }}
                </span>
            </h3>
            <h3 v-else class="subheadline">
                <span v-if="activeLanguage == 'en'">
                    {{ labels.prev?.en }}
                </span>
                <span v-if="activeLanguage == 'uk'">
                    {{ labels.prev?.uk }}
                </span>
            </h3>
            <span class="cta" :to="link">
                <LocalizationString :string="message"></LocalizationString>
                <SystemIcon type="arrow" color="light" :width="25" />
            </span>
        </nuxt-link>
    </nav>
</template>

<script>
import { mapState } from "vuex";

import { groq } from '@nuxtjs/sanity'
const schema = "settings"
const query = groq`*[_type == "${schema}"]{
  "prev": siteNavLabels.prev,
  "next": siteNavLabels.next
}[0]`


export default {
    data: () => ({
        labels: '',
        isCollapsed: false,
    }),
    async fetch() {
        this.labels = await this.$sanity.fetch(query)
    },
    fetchOnServer: false,
    computed: {
        ...mapState("localization", {
            activeLanguage: (state) => state.activeLanguage,
        }),
    },
    props: {
        message: {
            type: Object,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        hash: {
            type: String,
            required: true,
        },
        back: {
            type: Boolean,
            required: false,
        },
    },
};
</script>
<style lang='scss'>
@keyframes slideIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes arrowBounce {
    from {
        transform: translateX(0px);
    }

    to {
        transform: translateX(15px);
    }
}

@keyframes arrowBounceFlipped {
    from {
        transform: translateX(0px) rotate(180deg);
    }

    to {
        transform: translateX(-15px) rotate(180deg);
    }
}

.pagination {
    overflow: hidden;
    position: fixed;
    z-index: 130;

    @media (min-width: $collapse-bp) {
        border-radius: 5px;
    }

    animation: slideIn 0.8s ease-in forwards;
    bottom: 100px;

    right: 30px;
    color: #fff;
    text-align: center;

    background: $gray;

    @media (min-width: $collapse-bp) {
        background: $forest;
    }

    transition: 0.3s ease all;

    .tree-icon {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 4;
        text-align: left;

        img {
            margin-right: auto;
            height: 100%;
            object-fit: contain;
            object-position: left center;
            position: absolute;
            left: -17px;
            filter: grayscale(1);

            @media (max-width: $collapse-bp) {
                left: -40px;
                filter: grayscale(1) invert(1);
            }
        }
    }

    .wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 15px;
        width: 100%;
        z-index: 5;
        height: 100%;
    }

    h3 {
        color: #fff;
        margin-bottom: 10px;
    }

    a {
        background: $gray;
        transition: 0.3s ease background;

        @media (max-width: $collapse-bp) {
            background: rgba($forest, 0.8);
        }

        &:hover {
            background: rgba($white, 0.8);
            color: $gray;

            * {
                color: $gray;
            }

            .icon-arrow {
                filter: grayscale(1) invert(0);
            }
        }

        min-width: 300px;
        min-height: 10vh;
        max-height: 15vh;

        @media (max-height: 800px) {
            max-height: 300px;
        }

        *:hover {
            text-decoration: none;
        }

        .cta {
            display: flex;
            justify-content: center;
            font-size: 22px;
            line-height: 24px;

            >.icon {
                margin-left: 15px;
                width: 30px;
                animation: arrowBounce 0.9s ease-in alternate infinite;
            }
        }
    }

    &.back-btn {
        @media (min-width: $collapse-bp) {
            left: 30px;
        }

        right: unset;

        .tree-icon {
            left: unset;
            right: 0;

            img {
                left: unset;
                right: -47px;
            }
        }

        @media (max-width: $collapse-bp) {
            background: darken($forest, 20);

            a {
                background: rgba(darken($forest, 20), 0.3);
            }

            .tree-icon {
                opacity: 0.3;
            }
        }

        .cta {
            flex-direction: row-reverse;

            >.icon {
                margin-right: 15px;
                margin-left: unset;
                animation: arrowBounceFlipped 0.9s ease-in alternate infinite;
            }
        }
    }
}

// .pagination mobile positions
@media (max-width: $collapse-bp) {

    .occupation .pagination,
    .resistance .pagination {
        position: fixed;
    }

    .pagination {
        display: flex;
        position: relative;
        align-items: center;
        bottom: 0px !important;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;

        .wrapper {
            margin: 0 auto;
            padding: 30px;
        }
    }
}

nav.pagination:hover {
    background: $white;

    .icon.light {
        filter: invert(0);
    }
}

@media (max-width: $collapse-bp) {
    div.pagination {
        align-items: stretch;

        nav.pagination {
            min-height: 100%;

            .wrapper {
                min-height: 100%;
            }
        }
    }
}
</style>
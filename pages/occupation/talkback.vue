<template>
    <div :class="name">
        <div class="center talkback-container">
            <h1 class="collapsed-mb">
                <LocalizationString :string="title"></LocalizationString>
            </h1>
            <p class="instructions">
                <LocalizationString :string="instructions"></LocalizationString>
            </p>
            <div class="terms-list" :class="areDefsVisible ? 'reveal' : ''" v-if="terms">
                <div class="term-wrapper" v-for="item in terms" :key="item._key">
                    <h2 class="collapsed-mb term">
                        <LocalizationString :string="item.term"></LocalizationString>
                    </h2>
                    <p class="def">
                        <LocalizationString :string="item.definition"></LocalizationString>
                    </p>
                </div>

                <div class="button-wrapper">
                    <button class="dark centered" @click="toggleDefs">
                        <span v-if="areDefsVisible">
                            <LocalizationString :string="hideBtnText"></LocalizationString>
                        </span>
                        <span v-else>
                            <LocalizationString :string="showBtnText"></LocalizationString>
                        </span>
                    </button>
                </div>
            </div>
        </div>

        <div v-if="isPaginationVisible" class="pagination-wrapper">
            <div v-if="nav">
                <Pagination v-if="nav?.next" link="/3" :message="nav.next" />
            </div>
        </div>
    </div>
</template>
  
<script>

import { groq } from '@nuxtjs/sanity'
const schema = "talkback2"
const query = groq`*[_type == "${schema}"][0]`

export default {
    asyncData({ $sanity }) {
        const content = $sanity.fetch(query)
        return content
    },
    data() {
        return {
            name: "occupation-talkback",
            areDefsVisible: false,
            isPaginationVisible: false,
        };
    },
    head() {
        return {
            title: this.name
                .replace(/-/g, " ")
                .split(" ")
                .map((word) => {
                    return word[0].toUpperCase() + word.substring(1);
                })
                .join(" "),
        };
    },
    methods: {
        toggleDefs() {
            this.areDefsVisible = !this.areDefsVisible;
            if (!this.isPaginationVisible) {
                this.showPagination();
            }
        },
        showPagination() {
            this.isPaginationVisible = true;
        },
    },
};
</script>
  
<style lang="scss">
.occupation-talkback {

    h1,
    p,
    h2 {
        display: flex;
        justify-content: center;
    }

    width: 100%;
    min-width: 100vw;
    height: 100%;
    min-height: 100vh;

    @media (min-width: $collapse-bp) {
        padding: 100px 0;
    }

    @media (max-width: $collapse-bp) {
        padding-top: 60px;
    }

    // background: #35452b73;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
        margin-bottom: 15px;
    }
}

.terms-list {
    @media (max-width: $collapse-bp) {
        margin-bottom: 30px;
    }

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    @include siteContainerBig();
    margin-top: 30px;


    >* {
        margin: 15px;
        flex: 30%;
    }

    .button-wrapper {
        flex: 100%;
        margin: 15px;
        margin-top: 30px;

        button {
            margin-top: 0;
            margin-bottom: 0;
        }
    }

    .term-wrapper {
        background: $white;
        color: $gray;
        padding: 3rem;
        text-align: center;
        border-radius: 6px;

        * {
            color: $gray;
            margin: 0;
        }

        h2 {
            font-size: 42px;
            transition: 0.5s ease-out all;
        }

        &:hover {
            h2 {
                font-size: 50px;
            }
        }
    }

    &:not(.reveal) {
        .def {
            display: none;
        }
    }

    &.reveal {
        h2 {
            margin-bottom: 10px;
        }

        &:hover h2 {
            font-size: 42px;
        }
    }
}

@media (max-width: $collapse-bp) {
    .occupation-talkback {
        .talkback-container {
            max-width: 90%;
            margin-left: auto;
            margin-right: auto;
        }
    }

    .pagination-wrapper {
        width: 100%;
    }
}
</style>
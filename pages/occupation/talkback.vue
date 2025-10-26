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
                <Pagination v-if="nav?.next" link="/resistance" :message="nav.next" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import groq from 'groq'

const name = ref('occupation-talkback')
const areDefsVisible = ref(false)
const isPaginationVisible = ref(false)

const query = groq`*[_type == "talkback2"][0]`
const { data: content } = await useSanityQuery<any>(query)

const title = computed(() => content.value?.title)
const instructions = computed(() => content.value?.instructions)
const terms = computed(() => content.value?.terms)
const hideBtnText = computed(() => content.value?.hideBtnText)
const showBtnText = computed(() => content.value?.showBtnText)
const nav = computed(() => content.value?.nav)
const pageMetadata = computed(() => content.value?.pageMetadata)

function toggleDefs() {
    areDefsVisible.value = !areDefsVisible.value
    if (!isPaginationVisible.value) {
        showPagination()
    }
}
function showPagination() {
    isPaginationVisible.value = true
}

useHead(() => ({
    title: 'Talkback'
}))
</script>

<style lang="scss">
@use '~/assets/sass/imports/imports.scss' as *;

.occupation-talkback {
    width: 100%;
    min-width: 100vw;
    height: 100%;
    min-height: 100vh;
    // background: #35452b73;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1,
    p,
    h2 {
        display: flex;
        justify-content: center;
    }


    @media (min-width: $collapse-bp) {
        padding: 100px 0;
    }

    @media (max-width: $collapse-bp) {
        padding-top: 60px;
    }


    h1 {
        margin-bottom: 15px;
    }
}

.terms-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 30px;
    @include siteContainerBig();

    @media (max-width: $collapse-bp) {
        margin-bottom: 30px;
    }



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
        transition: .3s ease all;
        transform: scale(1.0);
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
        }

        &:hover {
            background: #e2e2e2;
            transform: scale(1.1);
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
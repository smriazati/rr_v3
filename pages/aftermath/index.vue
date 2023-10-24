<template>
    <div ref="wrapper" :class="name" class="text-scroller-page">
        <h1 class="visually-hidden">{{ name }}</h1>
        <div class="scroll-progress-bar-wrapper">
            <ScrollProgressBar :height="wrapperHeight" />
        </div>
        <div class="wrapper">
            <div class="text-scroller-wrapper" v-if="panels">
                <SystemTextScroller :panels="panels" @scrolled-to-end="showPagination()" />
            </div>
            <div v-show="isPaginationVisible">
                <div v-if="nav">
                    <Pagination v-if="nav?.next" link="/aftermath/stories" :message="nav.next" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { groq } from '@nuxtjs/sanity'
const schema = "landing4"
const query = groq`*[_type == "${schema}"][0]`

export default {
    asyncData({ $sanity }) {
        const content = $sanity.fetch(query)
        return content
    },

    data() {
        return {
            name: "aftermath",
            isPaginationVisible: false,
            wrapperHeight: null,
        };
    },
    head() {
        return {
            title: this.$setPageTitle(this.pageMetadata)
        }
    },
    mounted() {
        this.setWrapperHeight();
        window.addEventListener("resize", () => {
            this.setWrapperHeight();
        });
    },
    methods: {
        setWrapperHeight() {
            this.wrapperHeight = window.innerHeight * this.panels.length;
        },
        showPagination() {
            this.isPaginationVisible = true;
        },
        hidePagination() {
            this.isPaginationVisible = false;
        },
    },
};
</script>
  
<style lang="scss">
.aftermath {
    .text-wrapper {
        p {
            @include pBigStyle();
        }
    }

    @media (max-width: $collapse-bp) {
        .text-scroller .panel:last-child {
            padding-bottom: 100px;
        }

        .pagination {
            position: fixed;
            bottom: 0;
            width: 100%;
        }
    }
}
</style>
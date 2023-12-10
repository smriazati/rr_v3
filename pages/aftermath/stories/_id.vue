<template>
    <div :class="name" class="story-wrapper" ref="story">
        <div class="page-grid">
            <div class="title">
                <StoryTitle :subjectId="`subject${this.$route.params.id}`" :sectionId="sectionId" />
            </div>
            <div class="story" ref="theStory">
                <StoriesAftermath :schema="`story4_${this.$route.params.id}`"></StoriesAftermath>
            </div>
            <div class="pagination-row flex-row" v-show="isPaginationVisible">
                <PaginationHash link="/aftermath/stories" hash="stories" :message="nav?.nav?.prev" :back="true" />
                <Pagination link="/conclusion" :message="nav?.nav?.next" />
            </div>
        </div>

    </div>
</template>
  
<script>
import { groq } from '@nuxtjs/sanity'




export default {
    asyncData({ $sanity, params }) {

        const schema = "settings4"
        const query = groq`
        {
            "nav": *[_id == "${schema}"]{
                nav
            }[0],
            "metadata": *[_id == "story4_${params.id}"][0]{
                pageMetadata
            }
        }
        `

        const nav = $sanity.fetch(query)
        return nav
    },
    data() {
        return {
            name: "aftermath-stories-individual",
            sectionId: "aftermath",
            isPaginationVisible: true,
        };
    },
    head() {
        return {
            title: this.$setPageTitle(this.metadata?.pageMetadata)
        }
    }
};
</script>
  
  
  
<style lang="scss">
.story-wrapper {
    .page-grid {
        background: #E6E6E6;
        color: #000;
        display: flex;
        flex-direction: column;
        min-height: calc(100vh - 54px);
        width: 100%;
        position: absolute;
        top: 0;

        .story-title-container {
            grid-gap: 0;
            grid-column-gap: 15px;

            @media (max-width: $collapse-bp) {
                grid-row-gap: 15px;
            }

            .text-wrapper {
                padding: 0;
            }

            .banner {
                @media (max-width: $collapse-bp) {
                    grid-row: 1 / 4;
                }
            }

            .image-wrapper {
                max-width: 150px;
                justify-self: end;
                width: 100%;
                height: 100%;
                overflow: hidden;
                grid-row: 1 / 4;
                position: relative;
                z-index: 1000;

                @media (max-width: $collapse-bp) {
                    place-self: center;
                    grid-row: 1 / 2;
                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }
        }



        .story {
            flex: 100%;
            padding: 54px 0;
            @include siteContainerBig(400);

            main.content {
                height: 100%;

                >.row {
                    position: absolute;
                    top: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;

                    .vimeo-component {
                        flex: 100%;
                        width: 100%;
                        height: 100%;
                    }

                    &.slide {
                        &:not(.active-slide) {
                            display: none;
                        }

                        &.active-slide {
                            opacity: 0;
                            animation: fadeIn 0.3s ease-in forwards;
                        }
                    }

                    figure.banner img {
                        max-height: 60vh;
                    }

                    .row {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }
    }

    .pagination-row {

        @media (max-width: $collapse-bp) {
            margin-top: 30px;
        }
    }

    nav.pagination {

        @media (min-width: $collapse-bp) {
            margin-top: -100px;
        }

        .wrapper {
            // background: darken($sage, 10);

            &:hover {
                background: rgba(255, 255, 255, 0.8);
            }
        }
    }
}
</style>
  
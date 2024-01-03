<template>
    <div :class="name">
        <h1 class="visually-hidden">{{ name }}</h1>
        <div v-if="nav && viewedAllStories">
            <Pagination v-if="nav?.nav?.next" link="/occupation/talkback" :message="nav.nav.next" />
        </div>
        <MapStorymap ref="storymap" :animActive="true" :markers="markersData" :visitedOnce="visitedOnce" />
        <div v-if="isIntroVisible" class="modal-container transparent">
            <MapIntro @close-modal="closeIntro" />
        </div>
        <div v-show="areMapControlsActive" class="map-controls-outer-wrapper">
            <MapControls :markersData="markersData" @show-intro="showIntro()" />
        </div>
        <div v-if="isModalVisible" class="modal-container">
            <div class="close-overlay" @click="closeModal"></div>
            <MapModal :activeStoryId="activeStoryId" @close-modal="closeModal" />
        </div>
    </div>
</template>
  
<script>
import { mapState } from "vuex";

import { groq } from '@nuxtjs/sanity'
const query = groq`
{
"nav": *[_id == "settings2"]{
  nav
}[0],
  "metadata": *[_id == "intro2"][0]{
    pageMetadata
  }
}`

export default {
    asyncData({ $sanity }) {
        const content = $sanity.fetch(query)
        return content
    },
    data() {
        return {
            name: "occupation",
            isPaginationVisible: false,
            isIntroVisible: false,
            isModalVisible: false,
            viewedAllStories: false,
            areMapControlsActive: false,
            markersData: [
                {
                    id: 0,
                    name: "judenrat",
                    lat: 50.7003356,
                    lng: 26.5719255,
                },
                {
                    id: 1,
                    name: "chomut_house",
                    lat: 50.6988032,
                    lng: 26.570062,
                },
                {
                    id: 2,
                    name: "synagogue",
                    lat: 50.7082228,
                    lng: 26.57203,
                },
                {
                    id: 3,
                    name: "gendarmerie",
                    lat: 50.698633,
                    lng: 26.5661871,
                },
                {
                    id: 4,
                    name: "ghetto",
                    lat: 50.7002303,
                    lng: 26.5713738,
                },
                {
                    id: 5,
                    name: "horyn_river",
                    lat: 50.710556,
                    lng: 26.557222,
                },
            ],
        };
    },
    watch: {
        activeStoryId() {
            if (this.activeStoryId !== null) {
                this.isModalVisible = true;
            }
        },
        viewedStories() {
            if (!this.viewedStories) { return }
            if (this.viewedStories.length === this.markersData.length) {
                this.viewedAllStories = true;
                this.$store.commit("occupation/setFirstVisit");
            }
        },
        isModalVisible() {
            if (!this.isModalVisible && this.viewedAllStories) {
                this.showPagination();
            }
        },
        panAnimComplete() {
            if (this.panAnimComplete) {
                this.$store.commit(`occupation/setFlyoverComplete`);
                // setTimeout(this.activateIntro, 1500);
                this.showMapControls();
            }
        },
    },
    head() {
        return {
            title: this.$setPageTitle(this.metadata.pageMetadata)
        }
    },
    mounted() {

        if (this.visitedOnce) {
            this.areMapControlsActive = true;
        }

        this.showIntro();
    },
    methods: {
        showPagination() {
            this.isPaginationVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
            this.resetActiveStory();
        },
        resetActiveStory() {
            this.$store.commit("occupation/resetActiveStory");
        },
        closeIntro() {
            this.isIntroVisible = false;

            // if visited once, click return button. if visited first, click pan to button
            if (this.visitedOnce || this.areMapControlsActive) {
                const showMap = this.$refs.storymap.$refs.onReturnButton;
                showMap.click();
            } else {
                const panToMap = this.$refs.storymap.$refs.panToButton;
                panToMap.click();
            }
            // console.log(panToMap, showMap);
        },
        showIntro() {
            this.isIntroVisible = true;
        },
        showMapControls() {
            this.areMapControlsActive = true;
        },
    },

    computed: {
        ...mapState("occupation", {
            activeStoryId: (state) => state.activeStory,
            viewedStories: (state) => state.viewedStories,
            panAnimComplete: (state) => state.panAnimComplete,
            visitedOnce: (state) => state.visitedOnce,
        }),
    },
};
</script>
  
<style lang="scss">
.occupation {
    max-width: 100vw;
    min-height: 100vh;
    overflow: hidden;

    h1 {
        justify-content: center;
        text-align: center;

        @media (max-width: 1100px) {
            font-size: 48px;
            line-height: 52px;
        }
    }


}
</style>
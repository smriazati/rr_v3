<template>
    <div class="default-layout home-layout" :class="`route-${page}`">
        <ExhibitNav />
        <div class="home-language-picker">
            <LocalizationLanguagePicker></LocalizationLanguagePicker>
        </div>
        <nuxt :key="$route.fullPath" />
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
            page: this.$route.name,
        };
    },
    scrollToTop: true
};
</script>


<style lang="scss">
.default-layout {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 100vw;
    overflow-x: hidden;
}

.home-layout {
    .home-language-picker {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 999;
        padding: 20px;
    }
}
</style>
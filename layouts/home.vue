<template>
    <div class="default-layout home-layout" :class="`route-${page}`">
        <ExhibitNav />
        <div class="home-language-picker">
            <LocalizationLanguagePicker></LocalizationLanguagePicker>
        </div>
        <nuxt :key="$route.fullPath" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const page = computed(() => route.name)

// Enable scroll to top behavior
definePageMeta({
    scrollToTop: true
})
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
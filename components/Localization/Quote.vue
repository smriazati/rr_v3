<template>
    <span>
        <span v-if="activeString">
            &ldquo;{{ activeString }}&rdquo;
        </span>
        <span v-else>
            {{ string?.en }}
        </span>
    </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LocalizedString } from '../../types/sanity'

/**
 * LocalizationQuote Component
 * 
 * Core Functions:
 * - Displays localized quotes with proper quotation marks
 * - Provides fallback to English if translation is missing
 * - Handles undefined/null localized objects gracefully
 * 
 * Performance Optimizations:
 * - Computed property for efficient language switching
 * - Minimal reactivity for optimal performance
 */

// Props with TypeScript typing
interface Props {
    string?: LocalizedString
}

const props = defineProps<Props>()

// Get store and active language (using any for now to avoid type issues)
const store = useNuxtApp().$store as any
const activeLanguage = computed(() => store?.state?.localization?.activeLanguage || 'en')

// Computed property for active string with fallback
const activeString = computed(() => {
    if (!activeLanguage.value) return ''
    if (!props.string) return ''
    const lang = activeLanguage.value as keyof LocalizedString
    return props.string[lang] || props.string.en || ''
})
</script>

<style lang="scss" scoped>
span {
    display: flex;
}
</style>
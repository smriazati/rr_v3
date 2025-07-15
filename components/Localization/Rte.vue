<template>
    <div>
        <div v-if="content">
            <div v-if="activeString">
                <SanityContent :blocks="activeString?.rte" />
            </div>
            <div v-else>
                <SanityContent :blocks="content?.en?.rte" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LocalizedContent } from '../../types/sanity'

/**
 * LocalizationRte Component
 * 
 * Core Functions:
 * - Displays localized rich text content from Sanity
 * - Provides fallback to English if translation is missing
 * - Handles undefined/null localized objects gracefully
 * - Renders Sanity Portable Text blocks
 * 
 * Performance Optimizations:
 * - Computed property for efficient language switching
 * - Minimal reactivity for optimal performance
 */

// Props with TypeScript typing
interface Props {
    content?: LocalizedContent
}

const props = defineProps<Props>()

// Get store and active language (using any for now to avoid type issues)
const store = useNuxtApp().$store as any
const activeLanguage = computed(() => store?.state?.localization?.activeLanguage || 'en')

// Computed property for active content with fallback
const activeString = computed(() => {
    if (!activeLanguage.value) return null
    if (!props.content) return null
    const lang = activeLanguage.value as keyof LocalizedContent
    return props.content[lang] || props.content.en || null
})
</script>
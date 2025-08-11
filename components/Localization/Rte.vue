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

// Props with TypeScript typing
interface Props {
    content?: LocalizedContent
}

const props = defineProps<Props>()

// Get store and active language (using any for now to avoid type issues)
const { activeLanguage } = useLocalization()
// Computed property for active content with fallback
const activeString = computed(() => {
    if (!activeLanguage.value) return null
    if (!props.content) return null
    const lang = activeLanguage.value as keyof LocalizedContent
    return props.content[lang] || props.content.en || null
})
</script>
<template>
    <div>
        <div v-if="imageUrl">
            <img :src="imageUrl" :alt="alt" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SanityImage } from '../../types/sanity'
const { $urlFor } = useNuxtApp()


interface Props {
    img: SanityImage
    size?: number
}

const props = defineProps<Props>()
const store = useNuxtApp().$store as any
const activeLanguage = computed(() => store?.state?.localization?.activeLanguage || 'en')

const src = computed(() => {
    return props.img?.img || null
})
const alt = computed(() => {
    if (!props.img?.alt) return ''
    const lang = activeLanguage.value as keyof typeof props.img.alt
    return props.img.alt[lang] || props.img.alt.en || ''
})


const imageUrl = computed(() => {
    if (!src.value) return ''
    if (props.size) return $urlFor(src.value).width(props.size).auto('format').url()
    return $urlFor(src.value).auto('format').url()
})





</script>
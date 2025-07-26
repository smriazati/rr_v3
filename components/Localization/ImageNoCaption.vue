<template>
    <div>
        <div v-if="imageUrl && !size">
            <img :src="imageUrl" :alt="alt" />
        </div>
        <div v-if="imageUrl && size">
            <img :src="imageUrlSized" :alt="alt" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SanityImage } from '../../types/sanity'

const nuxtApp = useNuxtApp()
const urlFor = nuxtApp.$urlFor

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

// Build URL without size
const imageUrl = computed(() => {
    if (!src.value) return ''
    return urlFor(src.value).auto('format').url()
})

// Build URL with size (width)
const imageUrlSized = computed(() => {
    if (!src.value || !props.size) return ''
    return urlFor(src.value).width(props.size).auto('format').url()
})
</script>
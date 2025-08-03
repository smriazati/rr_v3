<template>
    <figure>
        <div v-if="imgSrc">
            <img :src="imgSrc" :alt="alt" />
        </div>

        <figcaption v-if="caption || credit">
            <p v-if="caption" class="caption">{{ caption }}</p>
            <p v-if="credit" class="credit">{{ credit }}</p>
        </figcaption>
    </figure>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { $urlFor } = useNuxtApp();

const props = defineProps<{
    img: any
    height: any
}>()
// Get store and active language (using any for now to avoid type issues)
const store = useNuxtApp().$store as any
const activeLanguage = computed(() => store?.state?.localization?.activeLanguage || 'en')

// Computed properties for image data with fallbacks
const imgSrc = computed(() => {
    if (!props.img.img) return ''
    if (props.height) return $urlFor(props.img.img).height(props.height).url();
    return $urlFor(props.img.img).url();
})

const alt = computed(() => {
    if (!props.img?.alt) return ''
    const lang = activeLanguage.value as keyof typeof props.img.alt
    return props.img.alt[lang] || props.img.alt.en || ''
})

const caption = computed(() => {
    if (!props.img?.caption) return ''
    const lang = activeLanguage.value as keyof typeof props.img.caption
    return props.img.caption[lang] || props.img.caption.en || ''
})

const credit = computed(() => {
    if (!props.img?.credit) return ''
    const lang = activeLanguage.value as keyof typeof props.img.credit
    return props.img.credit[lang] || props.img.credit.en || ''
})
</script>

<style lang="scss" scoped>
figure {
    display: flex;
    flex-direction: column;

    >div {
        display: flex;
        flex-direction: column;
    }

    figcaption {
        display: flex;
        flex-direction: column-reverse;

        .credit {
            text-align: right;
            margin-top: 4px;
            text-transform: uppercase;
            font-size: 10px;
        }
    }
}
</style>

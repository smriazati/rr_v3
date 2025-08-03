<template>
    <div>
        <h2 class="subheadline collapsed-mb">
            <LocalizationString :string="sectionTitle" />
        </h2>
    </div>
</template>

<script setup lang="ts">
import type { LocalizedString } from '~/types/sanity'

// Auto-imported in Nuxt 3
const route = useRoute()

// Sanity query
const query = `*[_type == "settings"]{
    "sections": siteNavLabels.sections
  }[0]`



interface SectionsResponse {
    sections?: LocalizedString[]
}

const { data: result } = useSanityQuery<SectionsResponse>(query)

// Extract localized title based on route name
const sectionTitle = computed(() => {
    const sections = result.value?.sections
    const routeName = route.name?.toString()

    if (!sections || !routeName) return null

    const routeKey = routeName.includes('-')
        ? routeName.substring(0, routeName.indexOf('-'))
        : routeName

    return sections[routeKey] ?? null
})
</script>
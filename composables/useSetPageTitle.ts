// composables/useSetPageTitle.ts
import { computed } from 'vue'
import type { LocalizedString } from '~/types/sanity'



type PageMetadata = {
    _type: string
    pageTitle: LocalizedString
}

export function useSetPageTitle(pageMetadata: PageMetadata) {
    const localization = useLocalization()

    // reactive computed string for page title in current activeLanguage
    const pageTitle = computed(() => {
        const lang = localization.activeLanguage
        if (!pageMetadata || !pageMetadata.pageTitle) return ''

        // fallback order: activeLanguage -> 'en' -> first available string
        return (
            pageMetadata.pageTitle[lang] ||
            pageMetadata.pageTitle['en'] ||
            Object.values(pageMetadata.pageTitle).find(Boolean) ||
            ''
        )
    })

    return {
        pageTitle,
    }
}

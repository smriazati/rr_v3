import { computed } from 'vue'
import { useLocalizationStore } from '~/stores/localization'
import type { LocalizedString, LocalizedContent } from '~/types/sanity'

/**
 * Composable for handling localization logic across components
 * Provides reactive language state and utility functions
 */
export const useLocalization = () => {
    const localizationStore = useLocalizationStore()

    // Reactive language state
    const activeLanguage = computed(() => localizationStore.activeLanguage)

    // Language selection function
    const setActiveLanguage = (lang: 'en' | 'uk' | 'es' | 'he') => {
        localizationStore.setActiveLanguage(lang)
    }

    // Get localized string with fallback
    const getLocalizedString = (localizedObj: LocalizedString | undefined, fallback = ''): string => {
        if (!localizedObj) return fallback
        return localizedObj[activeLanguage.value] || localizedObj.en || fallback
    }

    // Get localized content with fallback
    const getLocalizedContent = (localizedObj: LocalizedContent | undefined) => {
        if (!localizedObj) return null
        return localizedObj[activeLanguage.value] || localizedObj.en
    }

    return {
        activeLanguage,
        setActiveLanguage,
        getLocalizedString,
        getLocalizedContent
    }
} 
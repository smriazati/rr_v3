import { defineStore } from 'pinia'

export const useLocalizationStore = defineStore('localization', {
    state: () => ({
        activeLanguage: 'en' as 'en' | 'uk' | 'es' | 'he'
    }),
    actions: {
        setActiveLanguage(lang: 'en' | 'uk' | 'es' | 'he') {
            this.activeLanguage = lang
        }
    }
}) 
import type { NavigationGuard } from 'vue-router'
import type { LocalizationState } from '../types/store'

interface MiddlewareContext {
    app: {
        $store: {
            state: {
                localization: LocalizationState
            }
            commit: (mutation: string, payload: any) => void
        }
    }
    route: {
        query: Record<string, string>
    }
    from: any
}

export default defineNuxtRouteMiddleware((to, from) => {
    const localizationStore = useLocalizationStore()

    // commit update to store on page load
    const lang = to.query?.lang as string
    if (lang) {
        if (lang === 'uk' || lang === 'en' || lang === 'es' || lang === 'he') {
            localizationStore.setActiveLanguage(lang)
        }
    } else {
        to.query.lang = "en"
    }

    // Note: The commented router.beforeEach logic can be implemented
    // using Nuxt 3's navigation guards if needed
}) 
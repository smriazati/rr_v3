import { defineNuxtPlugin, useCookie, useRequestEvent } from '#app'
import { useLocalizationStore } from '~/stores/localization'
import { watch } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
    console.log('🗺️ locale plugin initialized, cookie=', useCookie('locale').value)

    const store = useLocalizationStore()
    const cookie = useCookie('locale')
    let initialLang = cookie.value

    // 1) If no cookie, on server try Accept-Language header:
    if (!initialLang && process.server) {
        const header = useRequestEvent().node.req.headers['accept-language'] || ''
        const nav = header.split(',')[0].split('-')[0]      // “es-ES” → “es”
        if (['en', 'es', 'uk'].includes(nav)) initialLang = nav
    }

    // 2) Fallback to English
    store.activeLanguage = initialLang || 'en'

    // 3) Whenever store changes, write back (silently ignore failures)
    watch(() => store.activeLanguage, lang => {
        try { cookie.value = lang } catch { }
        try { localStorage.setItem('locale', lang) } catch { }
    })
})

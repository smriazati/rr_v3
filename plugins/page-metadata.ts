import type { PageMetadata } from '../types/sanity'

export default defineNuxtPlugin(() => {
    const { $store } = useNuxtApp()

    function setPageTitle(data: any) {
        const activeLanguage = $store.state.localization.activeLanguage
        const titleInActiveLang = data?.pageTitle[activeLanguage];

        let baseName = '';
        if (this.name) {
            baseName = this.name.charAt(0).toUpperCase() + this.name.slice(1)
        }

        const finalTitle = titleInActiveLang ? titleInActiveLang : baseName
        return finalTitle;
    }

    return {
        provide: {
            setPageTitle
        }
    }
}) 
import imageUrlBuilder from '@sanity/image-url'
import { useRuntimeConfig } from 'nuxt/app'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const sanityConfig = {
        projectId: config.public.sanityProjectId as string,
        dataset: config.public.sanityDataset as string,
        apiVersion: config.public.sanityApiVersion as string,
        useCdn: false
    }
    const builder = imageUrlBuilder(sanityConfig)
    function urlFor(source: any) {
        return builder.image(source).auto('format')
    }
    return {
        provide: { urlFor }
    }
}) 
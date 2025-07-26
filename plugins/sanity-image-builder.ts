import imageUrlBuilder from '@sanity/image-url'

export default defineNuxtPlugin(() => {
    const sanityConfig = {
        projectId: 'hxa1vf8p',
        dataset: 'production',
        apiVersion: '2021-10-21',
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


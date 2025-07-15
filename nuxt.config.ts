// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // Target static generation
    ssr: true,
    nitro: {
        prerender: {
            routes: ['/']
        },
        compatibilityDate: '2025-07-14'
    },

    // App configuration
    app: {
        head: {
            titleTemplate: "%s | Roots of Resistance",
            title: 'Roots of Resistance',
            htmlAttrs: {
                lang: 'en'
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: 'Roots of Resistance: The Tuchyn Story teaches students about Jewish resistance during the Holocaust in the village of Tuchyn, Ukraine.' },
                { name: 'format-detection', content: 'telephone=no' },
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: '/1/bgimg.jpg',
                },
                {
                    hid: 'og:image:alt',
                    property: 'og:image:alt',
                    content: 'Painting of a person (small in frame) running into a forest.',
                }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ],
        }
    },

    // CSS
    css: ['~/assets/sass/main.scss'],

    // Plugins
    plugins: [
        '~/plugins/gsap.client.ts',
        '~/plugins/maps.client.ts',
        '~/plugins/router-actions.client.ts',
        '~/plugins/vimeo.client.ts',
        '~/plugins/sanity-image-builder.ts',
        '~/plugins/page-metadata.ts'
    ],

    // Router middleware
    routeRules: {
        '/': { prerender: true }
    },

    // Auto-import components
    components: true,

    // Modules
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/google-fonts',
        '@nuxtjs/sanity'
    ],

    // Google Fonts
    googleFonts: {
        prefetch: true,
        preconnect: true,
        families: {
            'Atkinson+Hyperlegible': {
                wght: [400, 700],
                ital: [400]
            },
        },
        display: 'swap'
    },

    // Sanity configuration
    sanity: {
        projectId: 'hxa1vf8p',
        apiVersion: '2021-10-21'
    },

    // Runtime config
    runtimeConfig: {
        public: {
            mapsApi: process.env.GOOGLEMAPSAPI,
            sanityProjectId: 'hxa1vf8p',
            sanityDataset: 'production',
            sanityApiVersion: '2021-10-21'
        }
    },

    // Vite configuration for SCSS
    vite: {
        // Removed SCSS additionalData to avoid conflicts with @use statements
    },

    // TypeScript
    typescript: {
        strict: false,
        typeCheck: false
    }
})

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default defineNuxtPlugin(() => {
    return {
        provide: {
            gsap,
            ScrollTrigger,
            ScrollToPlugin
        }
    }
}) 
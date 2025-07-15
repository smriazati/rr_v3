import { useRouter } from "nuxt/app"

export default defineNuxtPlugin(() => {
    const router = useRouter()
    const occupationStore = useOccupationStore()

    router.afterEach((to, from) => {
        if (from.path == '/2') {
            if (occupationStore.isFlyoverCompleted) {
                occupationStore.setFirstVisit()
            }
        }
    })
}) 
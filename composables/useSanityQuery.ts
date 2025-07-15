import { ref, computed, readonly } from 'vue'

/**
 * Custom composable for Sanity data fetching with caching and error handling
 * Provides reactive data fetching with loading and error states
 * Renamed to avoid conflict with @nuxtjs/sanity's built-in useSanityQuery
 */
export const useCustomSanityQuery = <T>(query: string, options?: {
    server?: boolean
    cache?: boolean
}) => {
    const data = ref<T | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Fetch data from Sanity
    const fetchData = async () => {
        loading.value = true
        error.value = null

        try {
            const { $sanity } = useNuxtApp()
            const result = await $sanity.fetch(query) as T
            data.value = result
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch data'
            console.error('Sanity query error:', err)
        } finally {
            loading.value = false
        }
    }

    // Computed properties for reactive state
    const isLoading = computed(() => loading.value)
    const hasError = computed(() => error.value !== null)
    const hasData = computed(() => data.value !== null)

    return {
        data: readonly(data),
        loading: isLoading,
        error: readonly(error),
        hasError,
        hasData,
        fetchData
    }
} 
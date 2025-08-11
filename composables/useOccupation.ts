import { computed } from 'vue'
import { useOccupationStore } from '~/stores/occupation'

export const useOccupation = () => {
    const occupationStore = useOccupationStore()
    const activeStory = computed(() => occupationStore.activeStory)
    const viewedStories = computed(() => occupationStore.viewedStories)
    const panAnimComplete = computed(() => occupationStore.panAnimComplete)
    const visitedOnce = computed(() => occupationStore.visitedOnce)

    const setActiveStory = (storyId: number) => {
        if (!storyId) return
        occupationStore.setActiveStory(storyId)
        if (!viewedStories.value.includes(storyId)) {
            viewedStories.value.push(storyId)
        }
    }

    const resetActiveStory = () => {
        occupationStore.resetActiveStory()
    }

    const setPanAnimComplete = () => {
        occupationStore.setPanAnimComplete()
    }

    const resetPanAnimComplete = () => {
        occupationStore.resetPanAnimComplete()
    }

    const setFirstVisit = () => {
        occupationStore.setFirstVisit()
    }

    const setFlyoverComplete = () => {
        occupationStore.setFlyoverComplete()
    }

    return {
        activeStory,
        viewedStories,
        panAnimComplete,
        visitedOnce,
        setActiveStory,
        resetActiveStory,
        setPanAnimComplete,
        resetPanAnimComplete,
        setFirstVisit,
        setFlyoverComplete
    }
} 
import { defineStore } from 'pinia'

export const useOccupationStore = defineStore('occupation', {
    state: () => ({
        activeStory: null as number | null,
        viewedStories: [] as number[],
        panAnimComplete: false,
        visitedOnce: false,
        isFlyoverCompleted: false
    }),
    actions: {
        setActiveStory(payload: number) {
            this.activeStory = payload
            if (!this.viewedStories.includes(payload)) {
                this.viewedStories.push(payload)
            }
        },
        resetActiveStory() {
            this.activeStory = null
        },
        setPanAnimComplete() {
            this.panAnimComplete = true
        },
        resetPanAnimComplete() {
            this.panAnimComplete = false
        },
        setFirstVisit() {
            this.visitedOnce = true
        },
        setFlyoverComplete() {
            this.isFlyoverCompleted = true
        }
    }
}) 
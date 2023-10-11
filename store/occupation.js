export const state = () => ({
    activeStory: null,
    viewedStories: [],
    panAnimComplete: false,
    visitedOnce: false,
    isFlyoverCompleted: false
})

export const mutations = {
    setActiveStory(state, payload) {
        state.activeStory = payload;
        if (!state.viewedStories.includes(payload)) {
            state.viewedStories.push(payload);
        }
    },
    resetActiveStory(state) {
        state.activeStory = null;
    },
    setPanAnimComplete(state) {
        state.panAnimComplete = true
    },
    resetPanAnimComplete(state) {
        state.panAnimComplete = false
    },
    setFirstVisit(state) {
        state.visitedOnce = true;
    },
    setFlyoverComplete(state) {
        state.isFlyoverCompleted = true;
    }
}


export const state = () => ({
    isExhibitNavVisible: true,
})

export const mutations = {
    showExhibitNav(state) {
        state.isExhibitNavVisible = true
    },
    hideExhibitNav(state) {
        state.isExhibitNavVisible = false
    }
}

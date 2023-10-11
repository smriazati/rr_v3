
export const state = () => ({
    activeLanguage: 'en',
})

export const mutations = {
    setActiveLanguage(state, payload) {
        state.activeLanguage = payload;
    },
}


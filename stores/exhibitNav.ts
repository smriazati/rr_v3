import { defineStore } from 'pinia'

export const useExhibitNavStore = defineStore('exhibitNav', {
    state: () => ({
        isExhibitNavVisible: true
    }),
    actions: {
        showExhibitNav() {
            this.isExhibitNavVisible = true
        },
        hideExhibitNav() {
            this.isExhibitNavVisible = false
        }
    }
}) 
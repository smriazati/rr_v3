// Store type definitions

export interface LocalizationState {
    activeLanguage: 'en' | 'uk' | 'es' | 'he';
}

export interface OccupationState {
    activeStory: number | null;
    viewedStories: number[];
    panAnimComplete: boolean;
    visitedOnce: boolean;
    isFlyoverCompleted: boolean;
}

export interface ExhibitNavState {
    isExhibitNavVisible: boolean;
}

export interface RootState {
    localization: LocalizationState;
    occupation: OccupationState;
    exhibitNav: ExhibitNavState;
}

// Store mutations
export interface LocalizationMutations {
    setActiveLanguage(state: LocalizationState, payload: 'en' | 'uk' | 'es' | 'he'): void;
}

export interface OccupationMutations {
    setActiveStory(state: OccupationState, payload: number): void;
    resetActiveStory(state: OccupationState): void;
    setPanAnimComplete(state: OccupationState): void;
    resetPanAnimComplete(state: OccupationState): void;
    setFirstVisit(state: OccupationState): void;
    setFlyoverComplete(state: OccupationState): void;
}

export interface ExhibitNavMutations {
    showExhibitNav(state: ExhibitNavState): void;
    hideExhibitNav(state: ExhibitNavState): void;
} 
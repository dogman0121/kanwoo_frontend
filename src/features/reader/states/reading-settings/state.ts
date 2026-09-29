
export interface ReadingSettings {
    aligment: "auto" | "vertical" | "horizontal",
    variant: "swipe" | "click",
    autoSave: boolean,
    pageNumbers: boolean,
    infinityChapter: boolean
}

export interface ReadingSettingsState {
    settings: ReadingSettings,
    isHydrated: boolean
}
export const initialState: ReadingSettingsState = {
    settings: {
        aligment: "horizontal",
        variant: "swipe",
        autoSave: true,
        pageNumbers: false,
        infinityChapter: false
    },
    isHydrated: false
}

export type RootState = {
    reader: {settings: ReadingSettingsState}
}
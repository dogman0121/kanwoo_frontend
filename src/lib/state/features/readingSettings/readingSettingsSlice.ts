import { createSlice } from "@reduxjs/toolkit";

export interface ReadingSettingsState {
    aligment: "auto" | "vertical" | "horizontal",
    autoSave: boolean,
    pageNumbers: boolean,
    infinityChapter: boolean
}
const initialState: ReadingSettingsState = {
    aligment: "horizontal",
    autoSave: true,
    pageNumbers: false,
    infinityChapter: false
}

function getReadingSettings() {
    if (typeof window !== 'undefined') {
        const readingSettingsJson = localStorage.getItem("reading_settings")

        if (readingSettingsJson)
            return JSON.parse(readingSettingsJson) as ReadingSettingsState

        saveReadingSettings(initialState)
        return initialState
    }

    return initialState
}

function saveReadingSettings(settings: ReadingSettingsState) {
    localStorage.setItem("reading_settings", JSON.stringify(settings))
}

export const readingSettingsSlice = createSlice({
    name: "reading_settings",
    initialState: getReadingSettings(),
    reducers: {
        setReadingSettingsAligment: (state, action) => {
            state.aligment = action.payload
            saveReadingSettings(state)
        },
        setReadingSettingsAutoSave: (state, action) => {
            state.autoSave = action.payload
            saveReadingSettings(state)
        },
        setReadingSettingsPageNumbers: (state, action) => {
            state.pageNumbers = action.payload
            saveReadingSettings(state)
        },
        setReadingSettingsInfinityChapter: (state, action) => {
            state.infinityChapter = action.payload
            saveReadingSettings(state)
        },
    }
})

export const { 
    setReadingSettingsAligment,
    setReadingSettingsAutoSave,
    setReadingSettingsInfinityChapter,
    setReadingSettingsPageNumbers
} = readingSettingsSlice.actions

export default readingSettingsSlice.reducer
import { createSlice } from "@reduxjs/toolkit";
import { initialState, ReadingSettings, ReadingSettingsState } from "./state";

// function getReadingSettings() {
//     if (typeof window !== 'undefined') {
//         const readingSettingsJson = localStorage.getItem("reading_settings")

//         if (readingSettingsJson)
//             return JSON.parse(readingSettingsJson) as ReadingSettingsState

//         saveReadingSettings(initialState)
//         return initialState
//     }

//     return initialState
// }

function saveReadingSettings(settings: ReadingSettings) {
    localStorage.setItem("reading_settings", JSON.stringify(settings))
}

export const readingSettingsSlice = createSlice({
    name: "reader/reading_settings",
    initialState: initialState,
    reducers: {
        setAligment: (state, action) => {
            state.settings.aligment = action.payload
            saveReadingSettings(state.settings)
        },
        setAutoSave: (state, action) => {
            state.settings.autoSave = action.payload
            saveReadingSettings(state.settings)
        },
        setPageNumbers: (state, action) => {
            state.settings.pageNumbers = action.payload
            saveReadingSettings(state.settings)
        },
        setInfinityChapter: (state, action) => {
            state.settings.infinityChapter = action.payload
            saveReadingSettings(state.settings)
        },
        setVariant: (state, action) => {
            state.settings.variant = action.payload
            saveReadingSettings(state.settings)
        },
        loadSettings: (state) => {
            const readingSettingsJson = localStorage.getItem("reading_settings")

            if (!readingSettingsJson)
                return

            const settings = JSON.parse(readingSettingsJson) as ReadingSettings
            state.settings = settings
            state.isHydrated = true

            saveReadingSettings(settings)

        }
    }
})

export const { 
    setAligment,
    setAutoSave,
    setInfinityChapter,
    setPageNumbers,
    setVariant,
    loadSettings
} = readingSettingsSlice.actions

export default readingSettingsSlice.reducer
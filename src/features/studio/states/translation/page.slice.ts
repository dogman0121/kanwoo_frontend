import { createSlice } from "@reduxjs/toolkit";
import { StudioTranslation } from "../../types/studio-translation.type";

export interface StudioTranslationState {
    translation?: StudioTranslation,
    ui: {
        createChapterDialogOpen: boolean
    }
}

const initialState: StudioTranslationState = {
    ui: {
        createChapterDialogOpen: false
    }
}

type RootState = {
    studio: {translation: {page: StudioTranslationState}}
}

export const studioProfileSlice = createSlice({
    name: "studio_translation",
    initialState,
    reducers: {
        setStudioTranslation: (state, action) => {
            state.translation = action.payload
        },
        setCreateChapterDialogOpen: (state, action) => {
            state.ui.createChapterDialogOpen = action.payload
        },
    }
})

export const selectTranslation = (state: RootState) => {
    return state.studio.translation.page.translation
}

export const selectCreateChapterDialogOpen = (state: RootState) => {
    return state.studio.translation.page.ui.createChapterDialogOpen
}

export const { 
    setStudioTranslation,
    setCreateChapterDialogOpen
} = studioProfileSlice.actions

export default studioProfileSlice.reducer
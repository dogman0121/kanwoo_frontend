import { Chapter } from "@/types/chapter";
import { Translation } from "@/types/translation";
import TranslationPermission from "@/types/translation/translationPermission";
import { createSlice } from "@reduxjs/toolkit";

export interface StudioPageTranslationState {
    translation?: Translation,
    translationPermission?: TranslationPermission,
    chapters?: Chapter[]
}

const initialState: StudioPageTranslationState = {
    translation: undefined,
    translationPermission: undefined,
    chapters: undefined
}

export const studioPageMangaSlice = createSlice({
    name: "studio_page_translation",
    initialState,
    reducers: {
        setStudioPageTranslation: (state, action) => {
            state.translation = action.payload
        },

        setStudioPageTranslationPermissions: (state, action) => {
            state.translationPermission = action.payload
        },

        setStudioPageTranslationChapters: (state, action) => {
            state.chapters = action.payload
        }
    }
})

export const { setStudioPageTranslation, setStudioPageTranslationPermissions, setStudioPageTranslationChapters } = studioPageMangaSlice.actions

export default studioPageMangaSlice.reducer
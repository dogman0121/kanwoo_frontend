import { Profile } from "@/types/profile";
import ProfilePermission from "@/types/profile/profilePermission";
import { createSlice } from "@reduxjs/toolkit";
import { StudioManga } from "../../types/studio-manga.type";

export interface StudioMangaState {
    manga?: StudioManga,
    ui: {
        createTranslationDialogOpen: boolean
    }
}

const initialState: StudioMangaState = {
    ui: {
        createTranslationDialogOpen: false
    }
}

type RootState = {
    studio: {manga: {page: StudioMangaState}}
}

export const studioMangaSlice = createSlice({
    name: "studio_manga",
    initialState,
    reducers: {
        setStudioManga: (state, action) => {
            state.manga = action.payload
        },
        setCreateTranslationDialogOpen: (state, action) => {
            state.ui.createTranslationDialogOpen = action.payload
        }
    }
})

export const selectManga = (state: RootState) => {
    return state.studio.manga.page.manga
}

export const selectCreateTranslationDialogOpen = (state: RootState) => {
    return state.studio.manga.page.ui.createTranslationDialogOpen
}

export const { 
    setStudioManga,
    setCreateTranslationDialogOpen
} = studioMangaSlice.actions

export default studioMangaSlice.reducer
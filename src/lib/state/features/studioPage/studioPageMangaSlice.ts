import Manga from "@/types/manga/manga";
import MangaPermission from "@/types/manga/mangaPermission";
import Translation from "@/types/translation/translation";
import { createSlice } from "@reduxjs/toolkit";

export interface StudioPageMangaState {
    manga?: Manga,
    mangaPermission?: MangaPermission,
    translations?: Translation[]
}

const initialState: StudioPageMangaState = {
    manga: undefined,
    mangaPermission: undefined,
    translations: undefined
}

export const studioPageMangaSlice = createSlice({
    name: "studio_page_manga",
    initialState,
    reducers: {
        setStudioPageManga: (state, action) => {
            state.manga = action.payload
        },

        setStudioPageMangaPermissions: (state, action) => {
            state.mangaPermission = action.payload
        },

        setStudioPageMangaTranslations: (state, action) => {
            state.translations = action.payload
        }
    }
})

export const { setStudioPageManga, setStudioPageMangaPermissions, setStudioPageMangaTranslations } = studioPageMangaSlice.actions

export default studioPageMangaSlice.reducer
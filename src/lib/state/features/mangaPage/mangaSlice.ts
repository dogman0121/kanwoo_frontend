import Chapter from "@/types/chapter/chapter";
import Manga from "@/types/manga/manga";
import MangaPermission from "@/types/manga/mangaPermission";
import ReadingProgress from "@/types/manga/readingProgress";
import Translation from "@/types/translation/translation";
import { createSlice } from "@reduxjs/toolkit";

export interface MangaPageState {
    manga?: Manga | null,
    mangaPermissions?: MangaPermission,
    readingProgress?: ReadingProgress,
    translations: Translation[],
    chapters: Record<number, Chapter[]>
    currentTranslation?: Translation,
    similar: Manga[]
}

const initialState: MangaPageState = {
    manga: undefined,
    mangaPermissions: undefined,
    readingProgress: undefined,
    translations: [],
    currentTranslation: undefined,
    similar: [],
    chapters: {}
}

export const mangaSlice = createSlice({
    name: "manga_page",
    initialState,
    reducers: {
        setMangaPageManga: (state, action) => {
            state.manga = action.payload
        },
        setMangaPagePermissions: (state, action) => {
            state.mangaPermissions = action.payload
        },
        setMangaPageSimilar: (state, action) => {
            state.similar = action.payload
        },
        setMangaPageTranslations: (state, action) => {
            state.translations = action.payload
        },
        setMangaPageReadingProgress: (state, action) => {
            state.readingProgress = action.payload
        },
        setMangaPageCurrentTranslation: (state, action) => {
            state.currentTranslation = action.payload
        },
        setMangaPageTranslationChapters: (state, action) => {
            const {translation, chapters} = action.payload

            const newChapters = {...state.chapters}
            newChapters[translation.id] = chapters

            state.chapters = newChapters
        }
    }
})

export const { 
    setMangaPageManga, 
    setMangaPageSimilar, 
    setMangaPagePermissions,
    setMangaPageTranslations ,
    setMangaPageReadingProgress,
    setMangaPageCurrentTranslation,
    setMangaPageTranslationChapters
} = mangaSlice.actions

export default mangaSlice.reducer
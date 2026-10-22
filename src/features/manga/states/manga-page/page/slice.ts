import { MangaPermission, MangaShort } from "@/types/manga";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RootState as AppState} from "@/lib/state/store"
import { CommentsBlock } from "@/lib/state/common/comments/state";
import { selectMangaBySlug } from "../../manga/selectors";
import { Entity } from "@/lib/types/Entity.type";
import { ReadingProgress, ReadingProgressContext } from "@/types/reading-progress";


export interface MangaPageState {
    mangaSlug?: string,
    similar?: MangaShort[],
    progress?: Entity<ReadingProgress, ReadingProgressContext>, 
    commentsBlock?: CommentsBlock,
    ui: {
        selectedSection: "info" | "comments" | "chapters"
    },
    loading: {
        comments: boolean,
    }
}

const initialState = {
    manga: undefined, 
    readingProgress: undefined,
    similar: undefined,
    commentsIds: undefined,
    ui: {
        selectedSection: "chapters"
    },
    loading: {
        comments: false,
    }

} as MangaPageState

export const fetchSimilar = createAsyncThunk(
    "manga_page/fetchSimilarState",
    async (mangaSlug: string, thunkAPI) => {

    }
)

export const mangaSlice = createSlice({
    name: "manga_page",
    initialState,
    reducers: {
        initializeMangaPage: (state, action: PayloadAction<{
            mangaSlug: string, 
            readingProgress: Entity<ReadingProgress, ReadingProgressContext>
        }>) => {
            const {mangaSlug, readingProgress} = action.payload

            state.mangaSlug = mangaSlug,
            state.progress = readingProgress

            state.commentsBlock = undefined
        },

        setManga: (state, action) => {
            state.mangaSlug = action.payload
        },
        setSection: (state, action) => {
            state.ui.selectedSection = action.payload
        }
    }
})

export type RootState = {
  mangaPage: {page: MangaPageState}
};

export const {
    initializeMangaPage, 
    setManga,
    setSection
} = mangaSlice.actions

export const selectManga = (state: AppState) => {
    const mangaSlug = state.mangaPage.page.mangaSlug
    
    if (!mangaSlug) return null

    return selectMangaBySlug(state, mangaSlug)
}

export const selectSimilar = (state: RootState) => state.mangaPage.page.similar
export const selectSection = (state: RootState) => state.mangaPage.page.ui.selectedSection


export default mangaSlice.reducer
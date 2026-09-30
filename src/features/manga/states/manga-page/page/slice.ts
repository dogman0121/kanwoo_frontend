import { MangaPermission, MangaShort } from "@/types/manga";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {RootState as AppState} from "@/lib/state/store"
import { CommentsBlock } from "@/lib/state/common/comments/state";
import { selectMangaBySlug } from "@/features/global/states/manga/selectors";


export interface MangaPageState {
    mangaSlug?: string,
    permission?: MangaPermission,
    similar?: MangaShort[],
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
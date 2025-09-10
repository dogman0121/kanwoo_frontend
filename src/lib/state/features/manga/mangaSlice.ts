import Manga from "@/types/manga";
import { createSlice } from "@reduxjs/toolkit";

export interface MangaState {
    manga: Manga | null | undefined,
    reading_progress: undefined,
    similar: Manga[]
}

const initialState: MangaState = {
    manga: undefined,
    reading_progress: undefined,
    similar: []
}

export const mangaSlice = createSlice({
    name: "manga",
    initialState,
    reducers: {
        setManga: (state, action) => {
            state.manga = action.payload
        },
        setSimilar: (state, action) => {
            state.similar = action.payload
        },
        setReadingProgress: (state, action) => {
            state.similar = action.payload
        }
    }
})

export const { setManga } = mangaSlice.actions

export default mangaSlice.reducer
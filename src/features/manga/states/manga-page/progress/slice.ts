import { ReadingProgress, ReadingProgressContext, ReadingProgressMetadata } from "@/types/reading-progress";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface ReadingProgressState {
    progress?: ReadingProgress,
    context?: ReadingProgressContext
}

const initialState: ReadingProgressState = {
    progress: undefined,
    context: undefined
}

export const progressSlice = createSlice({
    name: "manga_page_progress",
    initialState,
    reducers: {
        setProgress: (state: ReadingProgressState, action: PayloadAction<{progress: ReadingProgress, context: ReadingProgressContext}>) => {
            const {progress, context} = action.payload

            state.progress = progress
            state.context = context
        }
    }
})

export type RootState = {
  mangaPage: {progress: ReadingProgressState};
};

export const { 
    setProgress
} = progressSlice.actions

export const selectReadingProgress = (state: RootState) => state.mangaPage.progress.progress

export const selectReadingProgressContext = (state: RootState) => state.mangaPage.progress.context

export default progressSlice.reducer
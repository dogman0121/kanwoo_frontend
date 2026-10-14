import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudioManga } from "../../types/studio-manga.type";
import { Chapter } from "@/types/chapter";

interface TranslationChapterBlock {
    chapter: Chapter,
}

const chaptersAdapter = createEntityAdapter({
    selectId: (chapter: TranslationChapterBlock) => chapter.chapter.id
})

const initialState = chaptersAdapter.getInitialState()

type RootState = {
    studio: {translation: {chapters: typeof initialState}}
}

export const translationChaptersSlice = createSlice({
    name: "studio_translation_chapters",
    initialState,
    reducers: {
        setChaptersList: (state, action: PayloadAction<{chapters: Chapter[]}>) => {
            const {chapters} = action.payload

            chaptersAdapter.setMany(state, chapters.map(c => ({
                chapter: c,
            })))
        },
    }
})

export const {
    selectAll: selectChapters
} = chaptersAdapter.getSelectors((state: RootState) => state.studio.translation.chapters)

export const { 
    setChaptersList
} = translationChaptersSlice.actions

export default translationChaptersSlice.reducer
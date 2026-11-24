import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudioManga } from "../../types/studio-manga.type";
import { Chapter } from "@/types/chapter";
import { createChapter, fetchTranslation } from "./page.slice";
import { Entity } from "@/lib/types/Entity.type";
import { studioClientAPI } from "../../api/client.api";
import { StudioChapter } from "../../types/studio-chapter.type";

const chaptersAdapter = createEntityAdapter({
    selectId: (chapter: Entity<StudioChapter>) => chapter.data.id
})

const initialState = chaptersAdapter.getInitialState()

type RootState = {
    studio: {translation: {chapters: typeof initialState}}
}

export const fetchChapters = createAsyncThunk(
    "studio_translation_chapters/fetchChaptersStatus",
    async (translationId: number) => {
        const response = await studioClientAPI.getTranslationChapters(translationId)

        return {
            response: response,
            translationId: translationId
        }
    }
)

export const translationChaptersSlice = createSlice({
    name: "studio_translation_chapters",
    initialState,
    reducers: {
        setChaptersList: (state, action: PayloadAction<Entity<StudioChapter>[]>) => {

            chaptersAdapter.setMany(state, action.payload)
        },
    },
    extraReducers: (builder) => (builder
        .addCase(createChapter.fulfilled, (state, action) => {
            const {response} = action.payload

            chaptersAdapter.addOne(state, {
                data: response.data
            })
        })
        .addCase(fetchTranslation.fulfilled, (state, action) => {
            chaptersAdapter.removeAll(state)
        })
        .addCase(fetchChapters.fulfilled, (state, action) => {
            const {response: {data: chapters}} = action.payload

            chaptersAdapter.setAll(state, chapters.map(c => ({
                data: c
            })))
        })
    )
})

export const {
    selectAll: selectChapters
} = chaptersAdapter.getSelectors((state: RootState) => state.studio.translation.chapters)

export const { 
    setChaptersList
} = translationChaptersSlice.actions

export default translationChaptersSlice.reducer
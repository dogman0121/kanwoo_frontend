import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, KanwooReaderState } from "./state"
import { chaptersAdapter } from "./adapters";
import { findChapterIndexOrError, getNextPage, getPrevPage } from "./utils";
import { Chapter, ChapterContext, ChapterMetadata } from "@/types/chapter";

// export const fetchNextChapter = createAsyncThunk(
//     "reader/reader/fetchNextChapterByIdStatus",
//     async (chapter: Chapter, thunkAPI) => {
//         if (!chapter.next_chapter_id) throw new Error("Can't get next chapter id")

//         const response = await chapterClientApi.getChapter(chapter.next_chapter_id)

//         thunkAPI.dispatch(addChapter({
//             chapter: response.data, 
//             chapterContext: response.context,
//         }))

//         return {
//             chapter: response.data,
//             pagesOptions: response.metadata.pages
//         }
//     }

// )

export const kanwooReaderSlice = createSlice({
    name: "reader/reader",
    initialState,
    reducers: {
        setChapters: chaptersAdapter.setAll,
        initReader: (
            state: KanwooReaderState, 
            action: PayloadAction<{
                pageNumber: number,
                chapter: Chapter,
                chapterContext: ChapterContext,
            }>
        ) => {
            const {chapter, chapterContext, pageNumber} = action.payload

            state.currChapterInd = 0
            state.currPageNumber = 0

            chaptersAdapter.setAll(state, [{
                chapter: chapter,
                chapterContext: chapterContext,
            }])

            state.currPageNumber = pageNumber 
            state.initialized = true
        },
        addChapter: (
            state: KanwooReaderState,
            action: PayloadAction<{
                chapter: Chapter, 
                chapterContext: ChapterContext,
            }>
        ) => {
            const { chapter, chapterContext } = action.payload

            chaptersAdapter.addOne(state, {
                chapter: chapter,
                chapterContext: chapterContext,
            })            
        },
        setCurrentChapterIndex: (
            state: KanwooReaderState,
            action: PayloadAction<number>
        ) => {
            state.currChapterInd = action.payload
        },
        setCurrentChapterId: (
            state: KanwooReaderState, 
            action: PayloadAction<number>
        ) => {
            const chapterIndex = state.ids.findIndex(id => id == action.payload)

            state.currChapterInd = chapterIndex
        },
        setCurrentPageNumber: (
            state: KanwooReaderState, 
            action: PayloadAction<number>
        ) => {
            state.currPageNumber = action.payload
        },
        switchNextPage: (
            state: KanwooReaderState,
        ) => {
            const chapters = state.ids.map(id => state.entities[id].chapter)

            const {idx, page, isChapterChanged} = getNextPage(chapters, state.currChapterInd, state.currPageNumber)
            if (idx == null || page == null) throw new Error("failed to switch page")

            // console.log(idx, page, isChapterChanged)
            if (isChapterChanged) {
                state.currChapterInd = state.currChapterInd + 1
            }
            state.currPageNumber = idx

        },
        switchPrevPage: (
            state: KanwooReaderState
        ) => {
            const chapters = state.ids.map(id => state.entities[id].chapter)

            const {idx, page, isChapterChanged} = getPrevPage(chapters, state.currChapterInd, state.currPageNumber)
            if (idx == null || page == null) throw new Error("failed to switch page")

            if (isChapterChanged) {
                state.currChapterInd = state.currChapterInd - 1
            }
            state.currPageNumber = idx
        },
        switchNextChapter: (
            state: KanwooReaderState
        ) => {
            if (state.currChapterInd > 0)
                state.currChapterInd  = state.currChapterInd - 1
        },
        switchPrevChapter: (
            state: KanwooReaderState
        ) => {
            if (state.currChapterInd < state.ids.length-1)
                state.currChapterInd = state.currChapterInd + 1
        },
    },
})

export const {
    addChapter,
    setChapters,
    initReader,
    setCurrentPageNumber,
    setCurrentChapterId,
    switchNextChapter,
    switchNextPage,
    switchPrevChapter,
    switchPrevPage,
    setCurrentChapterIndex,
} = kanwooReaderSlice.actions


export default kanwooReaderSlice.reducer
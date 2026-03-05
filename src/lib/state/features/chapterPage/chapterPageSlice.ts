import Chapter from "@/types/chapter/chapter";
import ReadingProgress from "@/types/manga/readingProgress";
import { createSlice } from "@reduxjs/toolkit";

export interface ChapterPageState {
    currentChapterPage?: number,
    currentChapter?: Chapter,
    currentChapterIndex?: number,
    chaptersList?: Chapter[],
    readingProgress?: ReadingProgress
}

const initialState: ChapterPageState = {
    currentChapterPage: undefined,
    currentChapter: undefined,
    currentChapterIndex: undefined,
    chaptersList: undefined,
    readingProgress: undefined
}

export const chapterSlice = createSlice({
    name: "chapter_page",
    initialState,
    reducers: {
        initChapterPageChapter: (state, action) => {
            state.currentChapterPage = 0
            state.chaptersList = [action.payload]
            state.currentChapterIndex = 0
            state.currentChapter = action.payload
        },
        appendChapterPageChapter: (state, action) => {
            if (state.chaptersList){
                const newChaptersList = [...state.chaptersList]
                newChaptersList.push(action.payload)
                state.chaptersList = newChaptersList
            }
        },
        setChapterPagePrevChapter: (state) => {
            if (state.currentChapterIndex && state.chaptersList){
                state.currentChapterIndex -= 1
                state.currentChapter = state.chaptersList[state.currentChapterIndex]
            }
        },
        setChapterPageNextChapter: (state) => {
            if (state.currentChapterIndex && state.chaptersList){
                state.currentChapterIndex += 1
                state.currentChapter = state.chaptersList[state.currentChapterIndex]
            }
        },
        setChapterPageCurrentChapter: (state, action) => {
            state.currentChapter = action.payload
        },
        setChapterPageCurrentChapterPage: (state, action) => {
            state.currentChapterPage = action.payload
        },

        setReadingProgress: (state, action) => {
            state.readingProgress = action.payload
        }
    }
})

export const { 
    initChapterPageChapter,
    appendChapterPageChapter,
    setChapterPageCurrentChapter,
    setChapterPageCurrentChapterPage,
    setChapterPageNextChapter,
    setChapterPagePrevChapter,
    setReadingProgress
} = chapterSlice.actions

export default chapterSlice.reducer
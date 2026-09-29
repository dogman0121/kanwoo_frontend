import { createSelector } from "@reduxjs/toolkit"
import { chaptersAdapter } from "./adapters"
import { ChapterBlock, RootState } from "./state"
import { getNextPage, getPrevPage } from "./utils"
import { Chapter } from "@/types/chapter"


// Adapter selectors
export const {
    selectById: selectChapterBlockById,
    selectAll: selectChaptersBlock
} = chaptersAdapter.getSelectors((state: RootState) => state.reader.reader)

export const selectChapters = createSelector(
    [selectChaptersBlock],
    (chaptersStates: ChapterBlock[]) => {
        return chaptersStates.map(c => c.chapter)
    }
)


export const selectCurrentChapterId = (state: RootState) => {
    return state.reader.reader.ids[state.reader.reader.currChapterInd]
}
export const selectChapterIndex = (state: RootState, chapterId: number) => {
    const chaptersStates = selectChaptersBlock(state)

    const chapterIdx = chaptersStates.findIndex(chapter => chapter.chapter.id == chapterId)
    if (chapterIdx == -1) 
        throw new Error("Current chapter is not in chapters list")

    return chapterIdx
}
export const selectCurrentChapterIndex = (state: RootState) => {
    return state.reader.reader.currChapterInd

}
export const selectCurrentChapter = (state: RootState) => {
    const currentChapterId = state.reader.reader.ids[state.reader.reader.currChapterInd]
    if (currentChapterId)
        return selectChapterBlockById(state, currentChapterId).chapter

    return null
}

export const selectCurrentChapterBlock = (state: RootState) => {
    const currentChapterId = state.reader.reader.ids[state.reader.reader.currChapterInd]
    if (currentChapterId)
        return selectChapterBlockById(state, currentChapterId).chapter

    return null
}

export const selectPrevChapter = createSelector(
    [selectChapters, selectCurrentChapterIndex],
    (
        chapters: Chapter[], 
        currentChapterIdx: number | null
    ) => {
        if (currentChapterIdx && currentChapterIdx > 0)
            return chapters[currentChapterIdx-1]

        return null
    }
)
export const selectNextChapter = createSelector(
    [selectChapters, selectCurrentChapterIndex],
    (
        chapters: Chapter[], 
        currentChapterIdx: number | null
    ) => {
        if (currentChapterIdx && currentChapterIdx < chapters.length-1)
            return chapters[currentChapterIdx+1]

        return null
    }
)

export const selectCurrentPageNumber = (state: RootState) => {
    return state.reader.reader.currPageNumber
}

export const selectCurrentPage = createSelector(
    [selectCurrentChapter, selectCurrentPageNumber],
    (currChapter: Chapter | null, currPageNumber: number) => {
        if (!currChapter) return null

        return currChapter.pages![currPageNumber]
    }
)

export const selectPrevPage = createSelector(
    [selectChapters, selectCurrentChapterIndex, selectCurrentPageNumber], 
    (chapters: Chapter[], currChapterIdx: number, currPageNumber: number) => {
        if (!chapters.length) return null
        
        const {page} = getPrevPage(chapters, currChapterIdx, currPageNumber)
        return page
    }
)

export const selectPrevPageNumber = createSelector(
    [selectChapters, selectCurrentChapterIndex, selectCurrentPageNumber], 
    (chapters: Chapter[], currChapterIdx: number, currPageNumber: number) => {
        if (!chapters.length) return null
        const {idx} = getPrevPage(chapters, currChapterIdx, currPageNumber)
        return idx
    }
)

export const selectHasPrevPage = createSelector(
    [selectPrevPageNumber],
    (number: number | null) => {
        return number != null
    }
)

export const selectNextPage = createSelector(
    [selectChapters, selectCurrentChapterIndex, selectCurrentPageNumber], 
    (chapters: Chapter[], currChapterIdx: number, currPageNumber: number) => {
        if (!chapters.length) return null
        const {page} = getNextPage(chapters, currChapterIdx, currPageNumber)
        return page
    }
)

export const selectNextPageNumber = createSelector(
    [selectChapters, selectCurrentChapterIndex, selectCurrentPageNumber], 
    (chapters: Chapter[], currChapterIdx: number, currPageNumber: number) => {
        if (!chapters.length) return null
        const {idx} = getNextPage(chapters, currChapterIdx, currPageNumber)
        return idx
    }
)

export const selectHasNextPage = createSelector(
    [selectNextPageNumber],
    (number: number | null) => {
        return number != null
    }
)

export const selectInitialized = (state: RootState) => state.reader.reader.initialized
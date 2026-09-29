"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { useCallback, useEffect, useRef } from "react"
import { selectEndOfChapterReached } from "../../../../states/reader.slice"
import { selectChapters, selectCurrentChapterIndex, selectCurrentPageNumber } from "../../../../states/reader/selectors"
import { Chapter } from "@/types/chapter"
import Page from "@/types/chapter/page"

export type GetPageResult = {
    chapter: Chapter,
    chapterIdx: number
    page: Page
    pageIdx: number,
    endReached: boolean
}

export default function useSwitchPage() {
    const dispatch = useAppDispatch()

    const endReached = useAppSelector(selectEndOfChapterReached)

    const chapters = useAppSelector(selectChapters)
    const currChapterIdx = useAppSelector(selectCurrentChapterIndex)

    const currPageNum = useAppSelector(selectCurrentPageNumber)

    const getNextPageRef = useRef<() => GetPageResult | null>(() => null)
    const getPrevPageRef = useRef<() => GetPageResult | null>(() => null)

    const getNextPage = (
        chapters: Chapter[], 
        currChapterIdx: number, 
        currPageNum: number, 
        endReached: boolean
    ): GetPageResult | null => {
        const isLastPage = currPageNum == chapters[currChapterIdx].pages!.length - 1
        const hasNextChapter = currChapterIdx < chapters.length-1;

        if (!isLastPage) {
            return {
                chapter: chapters[currChapterIdx],
                chapterIdx: currChapterIdx,
                page: chapters[currChapterIdx].pages![currPageNum + 1],
                pageIdx: currPageNum + 1,
                endReached: false
            }
        } else {
            if (!endReached) {
                return {
                    chapter: chapters[currChapterIdx],
                    chapterIdx: currChapterIdx,
                    page: chapters[currChapterIdx].pages![currPageNum],
                    pageIdx: currPageNum,
                    endReached: true
                }
            } else {
                if (hasNextChapter) {
                    return {
                        chapter: chapters[currChapterIdx + 1],
                        chapterIdx: currChapterIdx + 1,
                        page: chapters[currChapterIdx + 1].pages![0],
                        pageIdx: 0,
                        endReached: false
                    }
                }
            }
        }

        return null;
    }

    const getPrevPage = (
        chapters: Chapter[], 
        currChapterIdx: number, 
        currPageNum: number, 
        endReached: boolean
    ): GetPageResult | null => {
        const isFirstPage = currPageNum == 0
        const hasPrevChapter = currChapterIdx > 0;

        if (!isFirstPage) {
            if (endReached) {
                return {
                    chapter: chapters[currChapterIdx],
                    chapterIdx: currChapterIdx,
                    page: chapters[currChapterIdx].pages![currPageNum],
                    pageIdx: currPageNum,
                    endReached: false
                }
            } else {
                return {
                    chapter: chapters[currChapterIdx],
                    chapterIdx: currChapterIdx,
                    page: chapters[currChapterIdx].pages![currPageNum - 1],
                    pageIdx: currPageNum - 1,
                    endReached: false
                }
            }
        
        } else {
            if (hasPrevChapter) {
                return {
                    chapter: chapters[currChapterIdx - 1],
                    chapterIdx: currChapterIdx - 1,
                    page: chapters[currChapterIdx - 1].pages![chapters[currChapterIdx - 1].pages!.length-1],
                    pageIdx: chapters[currChapterIdx - 1].pages!.length-1,
                    endReached: true
                }
            }
        }

        return null;
    }

    const handleGetNextPage = () => {
        return getNextPage(
            chapters,
            currChapterIdx,
            currPageNum,
            endReached
        )
    }

    const handleGetPrevPage = () => {
        return getPrevPage(
            chapters,
            currChapterIdx,
            currPageNum,
            endReached
        )
    }

    return {
        getPrevPage: handleGetPrevPage,
        getNextPage: handleGetNextPage,
        hasNextPage: currChapterIdx < chapters.length - 1 || !endReached,
        hasPrevPage: currChapterIdx > 0 || currPageNum > 0
    }
}
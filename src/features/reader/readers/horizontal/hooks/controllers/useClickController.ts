"use client"

import { useCallback, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { NextChapterEvent, PageChangedEvent, ReadingEventType } from "@/features/reader/interfaces/reader"
import useNavOpen from "@/features/reader/hooks/controllers/useNavOpen"
import useSwitchPage from "./useSwitchPage"
import { setCurrentChapterIndex, setCurrentPageNumber } from "@/features/reader/states/reader/slice"
import { setEndOfChapterReached } from "@/features/reader/states/reader.slice"
import { selectInfinityChapter } from "@/features/reader/states/reading-settings/selectors"

export default function useClickController({
    onPageChange,
    onLoadNextChapter
}: {
    onPageChange?: (event: PageChangedEvent) => void,
    onLoadNextChapter?: (event: NextChapterEvent) => void
}) {
    const dispatch = useAppDispatch()

    const playgroundRef = useRef<HTMLDivElement | null>(null)

    const {toggle: toggleNavOpen} = useNavOpen()
    const {getNextPage, getPrevPage} = useSwitchPage()
    const infinityChapter = useAppSelector(selectInfinityChapter)
    
    const handleClick = useCallback((event: PointerEvent) => {
        if (!playgroundRef.current) return

        const screenWidth = playgroundRef.current.clientWidth;

        const leftBorder = screenWidth * 0.33
        const rightBorder = screenWidth * 0.66

        let result;
        if (event.clientX < leftBorder) {
            console.log("click prev")
            result = getPrevPage()
        } else if (event.clientX > rightBorder) {
            console.log("click next")
            result = getNextPage()
        } else {
            //console.log("click mid")
            toggleNavOpen()
        }

        if (result) {
            const {chapter, chapterIdx, page, pageIdx, endReached} = result

            if (infinityChapter && result.endReached && result.chapter.next_chapter_id) {
                onLoadNextChapter?.({
                    type: ReadingEventType.LOAD_NEXT_CHAPTER,
                    value: {
                        chapter: chapter
                    }
                })
            }

            onPageChange?.({
                type: ReadingEventType.PAGE_CHANGED,
                value: {
                    chapter: chapter,
                    chapterId: chapter.id,
                    chapterIdx: chapterIdx,
                    page: page,
                    pageNumber: pageIdx      
                }
            })

            dispatch(setEndOfChapterReached(endReached))
        }

    }, [getNextPage, getPrevPage])

    useEffect(() => {
        playgroundRef.current?.addEventListener("click", handleClick)

        return () => {
            playgroundRef.current?.removeEventListener("click", handleClick)
        }
    }, [playgroundRef.current, handleClick])

    return {
        playgroundRef: playgroundRef
    }
}
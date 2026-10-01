"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { Chapter } from "@/types/chapter"
import Page from "@/types/chapter/page"
import { throttle } from "lodash"
import { useCallback, useEffect, useRef } from "react"
import useNavOpen from "../../../../hooks/controllers/useNavOpen"
import { NextChapterEvent, PageChangedEvent, ReadingEventType } from "../../../../interfaces/reader"
import { selectChapters, selectCurrentPageNumber } from "../../../../states/reader/selectors"
import { setCurrentChapterIndex, setCurrentPageNumber } from "../../../../states/reader/slice"
import { setEndOfChapterReached } from "../../../../states/reader.slice"
import { selectInfinityChapter } from "../../../../states/reading-settings/selectors"
import useWindowWidth from "@/features/reader/hooks/useWindowWidth"

const calculatePagesOffsets = (pages: Page[], windowWidth: number) => {
    const offsets = [0];

    for (let page of pages) {
        const height = page.height * (windowWidth / page.width)

        offsets.push(offsets[offsets.length-1] + height)
    }

    return offsets
}

const findOffset = (offsets: number[], currentScroll: number) => {
    let left = 0, right = offsets.length - 1
    while (right - left > 1) {
        const mid = Math.trunc((left + right) / 2)

        if (offsets[mid] > currentScroll)
            right = mid
        else if (offsets[mid] < currentScroll)
            left = mid
        else
            return mid
    }

    return offsets[right] <= currentScroll ? right : left
}

const calculateChapter = (chapters: Chapter[], chaptersOffsets: number[], scrollY: number) => {
    const resultIdx = findOffset(chaptersOffsets, scrollY)

    return { 
        chapter: chapters[resultIdx], 
        offset: chaptersOffsets[resultIdx], 
        idx: resultIdx 
    }
}

const calculatePage = (pageOffsets: number[], pages: Page[], scrollY: number) => {
    const offsetIdx = findOffset(pageOffsets, scrollY)

    return { 
        page: pages[offsetIdx], 
        offset: pageOffsets[offsetIdx], 
        idx: offsetIdx 
    }    
}

export default function useScrollController({
    onPageChange,
    onLoadNextChapter
}: {
    onLoadNextChapter?: (event: NextChapterEvent) => void,
    onPageChange?: (event: PageChangedEvent) => void
}) {
    const dispatch = useAppDispatch()

    const {close: closeNav, open: openNav, toggle: toggleNav} = useNavOpen()

    const scrollHandlerIsRunningRef = useRef(false)
    const playgroundRef = useRef<HTMLElement | null>(null)

    const currPageNumber = useAppSelector(selectCurrentPageNumber)
    const chapters = useAppSelector(selectChapters)
    const infinityChapter = useAppSelector(selectInfinityChapter)
    const chaptersElRefs = useRef(new Map<number, HTMLElement>())
    const chaptersOffsetsRef = useRef<number[]>([])
    const pagesOffsetsRef = useRef(new Map<number, number[]>());
    const progressInitialized = useRef(false)
    const { width } = useWindowWidth()

    const handleChapter = useCallback((chapters: Chapter[], chaptersOffsets: number[], pagesOffsets: Map<number, number[]>, scrollY: number) => {
        // Calculating current page position
        const { 
            chapter, 
            offset: chapterOffset, 
            idx: chapterIdx
        } = calculateChapter(chapters, chaptersOffsets, scrollY)
        
        if (!chapter.pages)
            throw new Error("Can't get chapter pages")

        const {  
            page,
            idx: pageIdx 
        } = calculatePage(pagesOffsets.get(chapter.id) || [], chapter.pages, scrollY - chapterOffset)

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
    }, [dispatch, onPageChange])

    const handleScrollPosition = (scrollY: number) => {      
        const windowHeight = window.innerHeight

        const topReached = scrollY <= 0
        const endReached = scrollY + windowHeight >= document.documentElement.scrollHeight

        if (topReached || endReached){
            openNav()
        }
        else {
            closeNav()
        }
    }

    const handleLoadNextChapter = (scrollY: number) => {
        const LOAD_NEXT_CHAPTER_OFFSET = 500      
        const windowHeight = window.innerHeight

        const inCriticalSection = scrollY + windowHeight >= document.documentElement.scrollHeight - LOAD_NEXT_CHAPTER_OFFSET

        if (infinityChapter && inCriticalSection) {
            const lastChapterInd = chapters.length - 1;

            const lastChapter = chapters[lastChapterInd]
            if (infinityChapter && lastChapter.next_chapter_id) {
                onLoadNextChapter?.({
                    type: ReadingEventType.LOAD_NEXT_CHAPTER,
                    value: {
                        chapter: lastChapter
                    }
                })
            }
        }
    }

    const handleClick = () => {
        toggleNav()
    }

    useEffect(() => {
        const chaptersOffsets: number[] = [];
        const pagesOffsets = new Map<number, number[]>()

        const updateOffsets = () => {
            for (let chap of chapters) {
                const chapEl = chaptersElRefs.current.get(chap.id)
                if (!chapEl) throw Error("Failed to get chapter el")
                
                const chapElRect = chapEl.getBoundingClientRect()

                chaptersOffsets.push(window.scrollY + chapElRect.top)

                pagesOffsets.set(chap.id, calculatePagesOffsets(chap.pages!, width))
            }

            chaptersOffsetsRef.current = chaptersOffsets
            pagesOffsetsRef.current = pagesOffsets

            if (!progressInitialized.current && chapters.length > 0) {
                const initialOffsets = pagesOffsetsRef.current.get(chapters[0].id)
                if (initialOffsets && typeof initialOffsets[currPageNumber] !== 'undefined') {
                    // Используем setTimeout, чтобы вытолкнуть скролл в конец макрозадач
                    setTimeout(() => {
                        window.scrollTo(0, initialOffsets[currPageNumber])
                        progressInitialized.current = true
                    }, 50)
                }
                progressInitialized.current = true
            }
        }

        const id = requestAnimationFrame(updateOffsets)
        return () => cancelAnimationFrame(id)
    }, [chapters, chaptersElRefs, width])

    useEffect(() => {
        playgroundRef.current?.addEventListener("click", handleClick)

        return () => {
            playgroundRef.current?.removeEventListener("click", handleClick)
        }
    }, [playgroundRef.current])

    useEffect(() => {
        const handleScroll = throttle((_event) => {
            if (scrollHandlerIsRunningRef.current) return;

            closeNav()
            scrollHandlerIsRunningRef.current = true
            window.requestAnimationFrame(() => {
                try {
                    const scrollY = window.scrollY

                    handleChapter(
                        chapters, 
                        chaptersOffsetsRef.current, 
                        pagesOffsetsRef.current, 
                        scrollY
                    )
                    handleScrollPosition(scrollY)
                    handleLoadNextChapter(scrollY)
                } catch (e: unknown) {
                    if (e instanceof Error)
                        console.error("ScrollController error:", e.message)
                } finally {
                    scrollHandlerIsRunningRef.current = false
                }
                scrollHandlerIsRunningRef.current = false
            })
        }, 150, {trailing: true})

        window.addEventListener("scroll", handleScroll, {passive: true})

        return () => {
            window.removeEventListener("scroll", handleScroll)
            handleScroll.cancel()
        };
    }, [handleClick, handleChapter, handleScrollPosition]);

    return {
        playgroundRef: playgroundRef,
        chaptersRef: chaptersElRefs
    }
}
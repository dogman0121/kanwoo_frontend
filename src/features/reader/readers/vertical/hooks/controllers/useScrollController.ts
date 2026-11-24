"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { Chapter } from "@/types/chapter"
import Page from "@/types/chapter/page"
import { throttle } from "lodash"
import { useCallback, useEffect, useRef } from "react"
import { selectChapters, selectCurrentChapterIndex, selectCurrentPageNumber } from "../../../../states/reader/selectors"
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
    onPageChanged,
    onLoadNextChapter,
    onChapterEnd,
    onTopReached,
    onTopLeaved,
    onBottomReached,
    onBottomLeaved,
    onClick,
    onScroll,
    disableInfinityChapter = false
}: {
    disableInfinityChapter?: boolean,
    onLoadNextChapter?: (chapter: Chapter) => void,
    onPageChanged?: (chapterIdx: number, pageNumber: number) => void,
    onChapterEnd?: (chapter: Chapter) => void,
    onTopReached?: () => void,
    onTopLeaved?: () => void,
    onBottomReached?: () => void
    onBottomLeaved?: () => void,
    onClick?: () => void,
    onScroll?: () => void,
}) {
    const dispatch = useAppDispatch()

    const scrollHandlerIsRunningRef = useRef(false)

    const playgroundRef = useRef<HTMLElement | null>(null)
    const chaptersElRefs = useRef(new Map<number, HTMLElement>())

    const currPageNumber = useAppSelector(selectCurrentPageNumber)
    const currChapterIndex = useAppSelector(selectCurrentChapterIndex)
    const chapters = useAppSelector(selectChapters)

    const chaptersOffsetsRef = useRef<number[]>([])
    const pagesOffsetsRef = useRef(new Map<number, number[]>());

    const progressInitialized = useRef(false)

    const topReachedRef = useRef(true)
    const bottomReachedRef = useRef(false)

    const { width } = useWindowWidth()

    const handlePage = useCallback((
        chapters: Chapter[], 
        chaptersOffsets: number[], 
        pagesOffsets: Map<number, number[]>, 
        scrollY: number
    ) => {
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

        if (chapterIdx != currChapterIndex || pageIdx != currPageNumber) {
            onPageChanged?.(chapterIdx, pageIdx)
        }
    }, [dispatch, onPageChanged, currPageNumber, currChapterIndex])

    const handleNav = (scrollY: number) => {      
        const windowHeight = window.innerHeight

        const topReached = scrollY <= 0
        const endReached = scrollY + windowHeight >= document.documentElement.scrollHeight

        if (topReached && topReachedRef.current == false) {
            onTopReached?.()
        } else if (!topReached && topReachedRef.current == true) {
            onTopLeaved?.()
        }
        topReachedRef.current = topReached

        if (endReached && bottomReachedRef.current == false) {
            onBottomReached?.()
        } else if (!endReached && bottomReachedRef.current == true) {
            onBottomLeaved?.()
        }
        bottomReachedRef.current = endReached
    }

    const handleEnd = (scrollY: number) => {
        const LOAD_NEXT_CHAPTER_OFFSET = 500      
        const windowHeight = window.innerHeight

        // Вычисляем коориднаты нижней части экрана
        const screenBottomHeight = scrollY + windowHeight
        // Находим нижнюю отсечку для
        const  bottomChapterBorder = document.documentElement.scrollHeight - LOAD_NEXT_CHAPTER_OFFSET
        const inCriticalSection = screenBottomHeight >= bottomChapterBorder

        if (inCriticalSection) {
            const lastChapterInd = chapters.length - 1;

            const lastChapter = chapters[lastChapterInd]
            if (!disableInfinityChapter && lastChapter.next_chapter_id) {
                onLoadNextChapter?.(lastChapter)
            }
            onChapterEnd?.(lastChapter)
        }
    }

    const handleClick = () => {
        onClick?.()
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

            onScroll?.()
            // Блокируем обработчику следующих событий до завершения текущей
            scrollHandlerIsRunningRef.current = true
            window.requestAnimationFrame(() => {
                try {
                    const scrollY = window.scrollY

                    // Вычисляем текущую главу и номер страницы
                    handlePage(chapters, chaptersOffsetsRef.current, pagesOffsetsRef.current, scrollY)
                    // Вычисляет события открытия/закрытия навигации
                    handleNav(scrollY)
                    // Проверяем, стоит ли загрузить новую главу
                    handleEnd(scrollY)
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
    }, [handleClick, handleEnd, handleNav, handlePage]);

    return {
        playgroundRef: playgroundRef,
        chaptersRef: chaptersElRefs
    }
}
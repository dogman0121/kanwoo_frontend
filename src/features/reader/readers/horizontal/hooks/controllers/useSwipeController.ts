"use client"

import { useCallback, useEffect, useRef } from "react"
import useSwitchPage, { GetPageResult } from "./useSwitchPage"
import useNavOpen from "../../../../hooks/controllers/useNavOpen"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { SwipeAnimation } from "../../animations/swipeAnimation"
import useScreenWidth from "../../../../hooks/useScreenWidth"
import { setEndOfChapterReached } from "../../../../states/reader.slice"
import { PageChangedEvent, ReadingEventType, NextChapterEvent } from "../../../../interfaces/reader"
import { selectChapters, selectCurrentChapterIndex, selectCurrentPageNumber, selectInitialized } from "../../../../states/reader/selectors"
import { selectInfinityChapter } from "@/features/reader/states/reading-settings/selectors"
import { useTheme } from "@mui/material"

export default function useSwipeController({
    onPageChange,
    onLoadNextChapter
}: {
    onPageChange?: (event: PageChangedEvent) => void,
    onLoadNextChapter?: (event: NextChapterEvent) => void
}) {
    const dispatch = useAppDispatch()
    const theme = useTheme()

    const chapters = useAppSelector(selectChapters)
    const currChapterInd = useAppSelector(selectCurrentChapterIndex) 
    const currPageNumber = useAppSelector(selectCurrentPageNumber)
    const infinityChapter = useAppSelector(selectInfinityChapter)
    const readerInitialized = useAppSelector(selectInitialized)

    // Const refs
    const playgroundRef = useRef<HTMLElement | null>(null)
    const swipeableRef = useRef<HTMLElement | null>(null)
    const animationRef = useRef(new SwipeAnimation())
    
    // Editable refs
    const moveLockRef = useRef(true)
    const animationMutexRef = useRef(false)
    const clickLockRef = useRef(true)
    const progressInitialized = useRef(false)

    const {width} = useScreenWidth(playgroundRef)

    const {
        getNextPage,
        getPrevPage,
        hasPrevPage,
        hasNextPage
    } = useSwitchPage()
    const {toggle: toggleNavOpen} = useNavOpen()

    const resetRefs = useCallback(() => {
        moveLockRef.current = true
        animationMutexRef.current = false
        clickLockRef.current = true
        progressInitialized.current = false
    }, [])

    const releasePointer = useCallback((pointerId: number) => {
        playgroundRef.current?.releasePointerCapture(pointerId)
        playgroundRef.current?.removeEventListener("pointermove", handlePointerMoveRef.current)
    }, [])

    const handlePointerMoveRef = useRef((event: PointerEvent) => {
        if (moveLockRef.current) return
        //console.log("pointer move")

        const { translate } = animationRef.current.process(
            {x: event.clientX, y: event.clientY}
        )
        
        // Если пользователь не двигал курсор
        if (clickLockRef.current && Math.abs(translate) > 0) {
            clickLockRef.current = false
        }

        if (swipeableRef.current) {
            swipeableRef.current.style.transform = `translate3d(${translate}%, 0, 0)`
        }
    })

    const finishTranslation = useCallback((translate: number, disableTransition?: boolean) => {
        if (!swipeableRef.current) return

        if (!disableTransition) {
            swipeableRef.current.style.transitionDuration = `${theme.transitions.duration.shorter}ms`
        }

        const pages = translate / 100
        swipeableRef.current.style.transform = `translate3d(calc(${pages} * var(--page-width)), 0, 0)`

        setTimeout(() => {
            if (swipeableRef.current)
                swipeableRef.current.style.transitionDuration = "0ms"

            animationMutexRef.current = false
        }, 300)
    }, [swipeableRef.current])

    const handlePointerDown = useCallback((event: PointerEvent) => {
        if (animationMutexRef.current) return
        //console.log("pointer down")
        animationMutexRef.current = true
        moveLockRef.current = false

        animationRef.current.start({x: event.clientX, y: event.clientY})

        playgroundRef.current?.setPointerCapture(event.pointerId)
        playgroundRef.current?.addEventListener("pointermove", handlePointerMoveRef.current)
    }, [])

    const switchPage = useCallback((direction: "next" | "prev") => {
        const result = direction == "next" ? getNextPage() : getPrevPage()

        if (result) {
            const hasNextChapter = result.chapter.next_chapter_id != null

            const {chapter, chapterIdx, page, pageIdx, endReached} = result

            if (infinityChapter && endReached && hasNextChapter) {
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
                    pageNumber: pageIdx,   
                }
            })

            dispatch(setEndOfChapterReached(endReached))

            return true
        }

        return false
    }, [getNextPage, getPrevPage])

    const handleClick = useCallback((event: PointerEvent) => {
        if (!playgroundRef.current) return

        const screenWidth = playgroundRef.current.clientWidth;

        const leftBorder = screenWidth * 0.33
        const rightBorder = screenWidth * 0.66

        if (event.clientX < leftBorder) {
            console.log("click prev")
            if (switchPage("prev")) {
                const newTranslation = animationRef.current.getTranslation() + 100
                finishTranslation(newTranslation, true)
                animationRef.current.setTranslation(newTranslation)
            }
        } else if (event.clientX > rightBorder) {
            console.log("click next")
            if (switchPage("next")) {
                const newTranslation = animationRef.current.getTranslation() - 100
                finishTranslation(newTranslation, true)
                animationRef.current.setTranslation(newTranslation)
            }
        } else {
            //console.log("click mid")
            toggleNavOpen()
        }
    }, [switchPage, finishTranslation])

    const handlePointerUp = useCallback((event: PointerEvent) => {
        moveLockRef.current = true
        if (!swipeableRef.current) return
        if (clickLockRef.current) { // Пользователь кликнул
            handleClick(event)
        } else {
            clickLockRef.current = true

            const {direction, swiped, translate} = animationRef.current.end()
            
            finishTranslation(translate)

            if (swiped) {
                switchPage(direction)
            }
        }

        releasePointer(event.pointerId)
        resetRefs()
    }, [onPageChange, handleClick, switchPage, finishTranslation])

    const handlePointerCancel = useCallback((event: PointerEvent) => {
        finishTranslation(animationRef.current.translation)
        releasePointer(event.pointerId)
        resetRefs()
    }, [])

    useEffect(() => {
        if (readerInitialized && !progressInitialized.current) {
            const translation = currPageNumber * -100
            animationRef.current.setTranslation(translation)
            if (swipeableRef.current)
                swipeableRef.current.style.transform =
                    `translate3d(calc(${-currPageNumber} * var(--page-width)), 0, 0)`

            progressInitialized.current = true
        }
    }, [readerInitialized])

    useEffect(() => {
        if (swipeableRef.current) {
            let chaptersOffset = 0
            for (let i = 0; i < currChapterInd; i++) {
                chaptersOffset += chapters[i].pages!.length + 1
            }
            
            const offset = chaptersOffset + currPageNumber
            swipeableRef.current.style.transform = `translate3d(calc(${-offset} * var(--page-width)), 0, 0)`
            swipeableRef.current.style.transition = theme.transitions.create("transform", {
                easing: theme.transitions.easing.easeIn,
                duration: "0ms"
            })
            animationRef.current.setTranslation(-100 * offset)
        }
    }, [swipeableRef.current])

    useEffect(() => {
        animationRef.current.setPrevSlideAvailable(hasPrevPage)
        animationRef.current.setNextSlideAvailable(hasNextPage)
    }, [hasNextPage, hasPrevPage])

    useEffect(() => {
        animationRef.current.setScreenWidth(width)
    }, [width])

    useEffect(() => {
        playgroundRef.current?.addEventListener("pointerdown", handlePointerDown)
        playgroundRef.current?.addEventListener("pointerup", handlePointerUp)
        playgroundRef.current?.addEventListener("pointercancel", handlePointerCancel)

        return () => {
            playgroundRef.current?.removeEventListener("pointerdown", handlePointerDown)
            playgroundRef.current?.removeEventListener("pointerup", handlePointerUp)
            playgroundRef.current?.removeEventListener("pointercancel", handlePointerCancel)
        }
    }, [playgroundRef.current, handlePointerUp, handlePointerDown, handlePointerCancel])

    return {
        playgroundRef: playgroundRef,
        swipeableRef: swipeableRef
    }
}
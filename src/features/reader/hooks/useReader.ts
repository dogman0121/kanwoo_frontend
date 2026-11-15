"use client"

import { useCallback, useEffect, useState } from "react"
import Reader, { ReaderEventsType } from "../lib/reader"
import PageLoader, { PageLoaderProps } from "../lib/page-loader"
import ReadingSessionController, { ReadingSessionControllerProps } from "../lib/session-controller"
import { useAppDispatch } from "@/lib/state/hooks"
import { LoadNextChapterEvent, PageChangedEvent, ChapterReadingFinishedEvent } from "../interfaces/reader"
import { setCurrentChapterIndex, setCurrentPageNumber } from "../states/reader/slice"


export default function useReader({
    pageLoaderProps,
    sessionControllerProps
}: {
    pageLoaderProps: PageLoaderProps,
    sessionControllerProps: ReadingSessionControllerProps
}) {
    const dispatch = useAppDispatch()

    const [reader, setReader] = useState<Reader | null>(null)

    const handlePageChanged = useCallback((event: PageChangedEvent) => {
        console.log("page_changed")
        if (!reader)
            return

        const {value: {chapterIdx, chapter, pageNumber}} = event

        dispatch(setCurrentChapterIndex(chapterIdx))
        dispatch(setCurrentPageNumber(pageNumber))

        reader.setPage(chapter.id, pageNumber)
    }, [dispatch, reader])

    const handleReadingChapterFinished = useCallback((event: ChapterReadingFinishedEvent) => {
        console.log("reading_finished")
        if (!reader)
            return

        const {value: {chapter}} = event

        reader.setPage(chapter.id, chapter.pages!.length-1, true)

    }, [dispatch, reader])

    const handleLoadNextChapter = useCallback((event: LoadNextChapterEvent) => {
        console.log("next_chapter")
        if (!reader)
            return

        const {value: {chapter}} = event

        if (chapter.next_chapter_id)
            reader.loadChapter(chapter.next_chapter_id)
    }, [dispatch, reader])

    useEffect(() => {
        if (!reader) {
            const pageLoader = new PageLoader(pageLoaderProps)
            const sessionController = new ReadingSessionController(sessionControllerProps)

            const reader = new Reader({
                pageLoader: pageLoader,
                sessionController: sessionController
            })

            setReader(reader)
        }

        return () => {
            reader?.destroy()
        }
    }, [])

    return {
        reader,
        handlePageChanged,
        handleReadingChapterFinished,
        handleLoadNextChapter
    }
}
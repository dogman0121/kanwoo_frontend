"use client"

import { useEffect, useRef, useState } from "react"
import Reader from "../lib/reader"
import PageLoader, { PageLoaderProps } from "../lib/pageLoader"
import ProgressSaver, { ProgressSaverProps } from "../lib/progressSaver"
import { NextChapterEvent, PageChangeEvent, ReadingEvent, ReadingEventType } from "../interfaces/reader"


export default function useReader({
    pageLoaderProps,
    progressSaverProps
}: {
    pageLoaderProps: PageLoaderProps,
    progressSaverProps: ProgressSaverProps
}) {

    const [reader, setReader] = useState<Reader | null>(null)

    const handlePageChange = (event: PageChangeEvent) => {
        const {value: {chapterId, pageNumber}} = event;

        reader?.setChapter(chapterId)
        reader?.setPageNumber(pageNumber)
    }

    const handleLoadChapter = (event: NextChapterEvent) => {
        const {value: {nextChapterId}} = event

        reader?.loadChapter(nextChapterId)
    }

    useEffect(() => {
        if (!reader) {
            const pageLoader = new PageLoader(pageLoaderProps)
            const progressSaver = new ProgressSaver(progressSaverProps)

            setReader( 
                new Reader({
                    pageLoader: pageLoader,
                    progressSaver: progressSaver
                })
            )
        }

        return () => {
            reader?.destroy()
        }
    }, [])

    return {
        reader: reader,
        onPageChanged: handlePageChange,
        onLoadChapter: handleLoadChapter
    }
}
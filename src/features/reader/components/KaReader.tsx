"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { useCallback, useEffect } from "react"
import useReader from "../hooks/useReader"
import pageLoaderContext from "../contexts/pageLoaderContext"
import { selectCommentsPanelOpen, setCommentsPanelOpen, setEndOfChapterReached } from "../states/reader.slice"
import ReaderContainer from "./ui/ReaderContainer"
import { ReaderHeader } from "./ReaderHeader"
import PageNumberChip from "./PageNumberChip"

import { selectDeviceType } from "@/features/global/states/app/slice"
import { selectAligment, selectIsHydrated } from "../states/reading-settings/selectors"
import { loadSettings } from "../states/reading-settings/slice"
import ReaderCommentsPanel from "./comments/ReaderCommentsPanel"
import { addChapter, initReader, setCurrentChapterIndex, setCurrentPageNumber } from "../states/reader/slice"
import Reader, { ReaderEventsType, InitilizedEvent, ChapterLoadedEvent, ReaderEvent } from "../lib/reader"
import HorizontalReader from "../readers/horizontal/components/HorizontalReader"
import VerticalReader from "../readers/vertical/components/VerticalReader"
import NavigationButtons from "./NavigationButtons"
import { Box } from "@mui/material"
import { NextChapterEvent, PageChangedEvent } from "../interfaces/reader"

export default function KaReader({
    initChapterID
}: {
    initChapterID: number
}) {
    const dispatch = useAppDispatch()

    const aligment = useAppSelector(selectAligment)
    const hydrated = useAppSelector(selectIsHydrated)
    const commentsPanelOpen = useAppSelector(selectCommentsPanelOpen)
    const deviceType = useAppSelector(selectDeviceType)

    const { reader } = useReader({
        pageLoaderProps: {
            preloadBeforeSize: 1,
            preloadAfterSize: 2,
            maxRetries: 3
        },
        progressSaverProps: {

        }
    })

    const onInitialized = (event: InitilizedEvent) => {
        const {value} = event

        dispatch(initReader({
            chapter: value.chapter,
            chapterContext: value.chapterContext,
            pageNumber: 0
        }))
    }

    const onChapterLoaded = (event: ChapterLoadedEvent) => {
        const {chapter, chapterContext} = event.value
        
        dispatch(addChapter({
            chapter: chapter,
            chapterContext: chapterContext
        }))
    }

    const handlePageChanged = useCallback((event: PageChangedEvent) => {
        const {value: {chapterIdx, pageNumber, chapter}} = event

        dispatch(setCurrentChapterIndex(chapterIdx))
        dispatch(setCurrentPageNumber(pageNumber))

        if (reader) {
            reader.setChapter(chapter.id)
            reader.setPageNumber(pageNumber)
        }
    }, [dispatch, reader])

    const handleLoadNextChapter = (event: NextChapterEvent) => {
        const {value: {chapter}} = event

        if (reader) {
            if (chapter.next_chapter_id)
                reader.loadChapter(chapter.next_chapter_id)
        }
    }

    useEffect(() => {
        dispatch(loadSettings())
    }, [])

    useEffect(() => {
        if (reader) {
            reader.addEventListener(ReaderEventsType.INITIALIZED, onInitialized)
            reader.addEventListener(ReaderEventsType.CHAPTER_LOADED, onChapterLoaded)

            reader.initialize(initChapterID)
        }

        return () => {
            reader?.destroy()
        }
    }, [reader, initChapterID])

    const offsetEnabled = commentsPanelOpen && deviceType == "desktop"

    if (!hydrated) return <></>

    return (
        <pageLoaderContext.Provider
            value={{
                loader: reader?.getPageLoader()
            }}
        >
            <ReaderHeader drawerOpen={offsetEnabled}/>
            <PageNumberChip drawerOpen={offsetEnabled}/>
            {aligment === "horizontal" ?
                <HorizontalReader 
                    onPageChange={handlePageChanged}
                    onLoadNextChapter={handleLoadNextChapter}
                />
                :
                <VerticalReader
                    onPageChange={handlePageChanged}
                    onLoadNextChapter={handleLoadNextChapter}
                />
            }
            <NavigationButtons />
            <ReaderCommentsPanel />
        </pageLoaderContext.Provider>
    )
}
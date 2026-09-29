"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { useEffect } from "react"
import useReader from "../hooks/useReader"
import pageLoaderContext from "../contexts/pageLoaderContext"
import { selectCommentsPanelOpen, setCommentsPanelOpen } from "../states/reader.slice"
import ReaderContainer from "./ui/ReaderContainer"
import { ReaderHeader } from "./ReaderHeader"
import PageNumberChip from "./PageNumberChip"

import { selectDeviceType } from "@/features/global/states/app/slice"
import { selectAligment, selectIsHydrated } from "../states/reading-settings/selectors"
import { loadSettings } from "../states/reading-settings/slice"
import ReaderCommentsPanel from "./comments/ReaderCommentsPanel"
import { addChapter, initReader } from "../states/reader/slice"
import Reader, { ReaderEventsType, InitilizedEvent, ChapterLoadedEvent } from "../lib/reader"
import HorizontalReader from "../readers/horizontal/components/HorizontalReader"
import VerticalReader from "../readers/vertical/components/VerticalReader"
import NavigationButtons from "./NavigationButtons"
import { Box } from "@mui/material"

export default function KanwooReader({
    initChapterID
}: {
    initChapterID: number
}) {
    const dispatch = useAppDispatch()

    const aligment = useAppSelector(selectAligment)
    const hydrated = useAppSelector(selectIsHydrated)
    const commentsPanelOpen = useAppSelector(selectCommentsPanelOpen)
    const deviceType = useAppSelector(selectDeviceType)

    const {reader, onPageChanged, onLoadChapter} = useReader({
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
            pageNumber: value.readingProgress.page
        }))
    }

    const onChapterLoaded = (event: ChapterLoadedEvent) => {
        const {chapter, chapterContext} = event.value
        
        dispatch(addChapter({
            chapter: chapter,
            chapterContext: chapterContext
        }))
    }

    useEffect(() => {
        dispatch(loadSettings())
    }, [])

    useEffect(() => {
        console.log(reader)
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
                    onPageChange={onPageChanged}
                    onLoadNextChapter={onLoadChapter}
                />
                :
                <VerticalReader
                    onPageChange={onPageChanged}
                    onLoadNextChapter={onLoadChapter}
                />
            }
            <NavigationButtons />
            <ReaderCommentsPanel />
        </pageLoaderContext.Provider>
    )
}
"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { useEffect } from "react"
import useReader from "../hooks/useReader"
import pageLoaderContext from "../contexts/pageLoaderContext"
import { selectCommentsPanelOpen } from "../states/reader.slice"
import { ReaderHeader } from "./ReaderHeader"
import PageNumberChip from "./PageNumberChip"

import { selectDeviceType } from "@/features/global/states/app/slice"
import ReaderCommentsPanel from "./comments/ReaderCommentsPanel"
import { addChapter, initReader } from "../states/reader/slice"
import { ReaderEventsType, InitilizedEvent, ChapterLoadedEvent, ReaderEvent } from "../lib/reader"
import HorizontalReader from "../readers/horizontal/components/HorizontalReader"
import VerticalReader from "../readers/vertical/components/VerticalReader"
import NavigationButtons from "./NavigationButtons"
import { ReaderMode } from "@/features/types/reader-mode"
import { selectAuthProfile } from "@/features/auth/states/auth-profile"
import { ReadingModeEnum } from "@/features/translations/entities/reading-mode.enum"
import useReadingMode from "../hooks/useReadingMode"
import useReadingSettings from "../hooks/useReadingSettings"
import usePageMetadata from "../hooks/usePageMetadata"
import { Box } from "@mui/material"

export default function KaReader({
    initChapterID,
    disablePath = false
}: {
    initChapterID: number,
    disablePath?: boolean
}) {    
    const dispatch = useAppDispatch()

    const commentsPanelOpen = useAppSelector(selectCommentsPanelOpen)
    const deviceType = useAppSelector(selectDeviceType)

    const authProfile = useAppSelector(selectAuthProfile)

    usePageMetadata({pathDisabled: disablePath, metadataDisabled: disablePath})

    const { settingsLoaded } = useReadingSettings()

    const { 
        reader, 
        handlePageChanged, 
        handleReadingChapterFinished, 
        handleLoadNextChapter 
    } = useReader({
        pageLoaderProps: {
            preloadBeforeSize: 1,
            preloadAfterSize: 2,
            maxRetries: 3
        },
        sessionControllerProps: {

        }
    })

    const {readingMode, resetReadingMode} = useReadingMode(reader)


    const onInitialized = (event: InitilizedEvent) => {
        const {value: {chapter, progress}} = event

        resetReadingMode()
        
        dispatch(initReader({
            chapter: chapter,
            pageNumber: progress?.data.page || 0
        }))
    }

    const onChapterLoaded = (event: ChapterLoadedEvent) => {
        const {value: chapter} = event
        
        dispatch(addChapter(chapter))
    }

    useEffect(() => {
        if (reader) {
            reader.addEventListener(ReaderEventsType.INITIALIZED, onInitialized)
            reader.addEventListener(ReaderEventsType.CHAPTER_LOADED, onChapterLoaded)

            reader.initialize({
                mode: authProfile ? ReaderMode.AUTHORIZED : ReaderMode.ANONYMUS,
                chapterID: initChapterID
            })
        }

        return () => {
            reader?.destroy()
        }
    }, [reader, initChapterID])

    const offsetEnabled = commentsPanelOpen && deviceType == "desktop"

    if (!settingsLoaded) return null

    return (
        <pageLoaderContext.Provider
            value={{
                pageLoader: reader?.getPageLoader()
            }}
        >
            <ReaderHeader drawerOpen={offsetEnabled}/>
            <PageNumberChip drawerOpen={offsetEnabled}/>
            { readingMode && (
                <>
                    {readingMode == ReadingModeEnum.HORIZONTAL ?
                        <HorizontalReader 
                            onPageChanged={handlePageChanged}
                            onChapterReadingFinished={handleReadingChapterFinished}
                            onLoadNextChapter={handleLoadNextChapter}
                        />
                        :
                        <VerticalReader
                            onPageChanged={handlePageChanged}
                            onChapterReadingFinished={handleReadingChapterFinished}
                            onLoadNextChapter={handleLoadNextChapter}
                        />
                    }
                </>
            )}
            <NavigationButtons />
            <ReaderCommentsPanel />
        </pageLoaderContext.Provider>
    )
}
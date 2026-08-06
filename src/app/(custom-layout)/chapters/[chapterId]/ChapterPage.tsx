"use client"

import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/state/hooks"
import { useEffect, useRef, useState } from "react"
import NavOpenContext from "./_contexts/navOpenContext"
import { PageHeader } from "./_components/Header"
import PageNumber from "./_components/PageNumber"
import { Box } from "@mui/material"
import NavigationButtons from "./_components/NavigationButtons"
import Chapter from "@/types/chapter/chapter"
import { ReadingSettingsState } from "@/lib/state/features/readingSettings/readingSettingsSlice"
import VerticalReadingScreen from "./_components/VerticalReadingScreen"
import HorizontalReadingScreen from "./_components/HorizontalReadingScreen"
import { initChapterPageChapter, setReadingProgress } from "@/lib/state/features/chapterPage/chapterPageSlice"
import { clientFetch } from "@/lib/fetch/clientFetch"
import ReadingProgress from "@/types/manga/readingProgress"

function getAligment(chapter: Chapter, readingSettings: ReadingSettingsState){
    if (readingSettings.aligment == "auto") {
        const mangaType = chapter?.manga?.type.id;
    
        if (mangaType == 3)
            return "vertical"
        else
            return "horizontal"
    }

    return readingSettings.aligment
}

export default function ChapterPage({
    initialChapter
}: {
    initialChapter: Chapter
}) {

    const dispatch = useAppDispatch()


    useEffect(() => {
        clientFetch.get<ReadingProgress>(`/chapters/${initialChapter.id}/progress`)
            .then(response => {
                dispatch(setReadingProgress(response.data))
            })
        dispatch(initChapterPageChapter(initialChapter));
    }, [initialChapter]);

    const readingSettings = useAppSelector(state => state.readingSettings)

    const [navOpen, setNavOpen] = useState<boolean>(true)
    const [endOpen, setEndOpen] = useState<boolean>(false)

    if (!initialChapter) return;

    return (
        <NavOpenContext.Provider value={{
            open: navOpen,
            setOpen: setNavOpen,
            endOpen: endOpen,
            setEndOpen: setEndOpen
        }}>
            <PageHeader />
            <PageNumber />
            <Box
                component={"main"}
            >
                { getAligment(initialChapter, readingSettings) == "vertical" ?
                    <VerticalReadingScreen />
                    :
                    <HorizontalReadingScreen />
                }
            </Box>
            <NavigationButtons />
        </NavOpenContext.Provider>
    )
}
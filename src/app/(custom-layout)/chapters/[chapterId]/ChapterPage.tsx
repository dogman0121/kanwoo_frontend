"use client"

import { useAppSelector } from "@/lib/state/hooks"
import { useState } from "react"
import NavOpenContext from "./_contexts/navOpenContext"
import { PageHeader } from "./_components/Header"
import PageNumber from "./_components/PageNumber"
import { Box } from "@mui/material"
import VerticalScreen from "./_components/VerticalScreen"
import HorizontalScreen from "./_components/HorizontalScreen"
import NavigationButtons from "./_components/NavigationButtons"
import Chapter from "@/types/chapter/chapter"
import { ReadingSettingsState } from "@/lib/state/features/readingSettings/readingSettingsSlice"

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

export default function ChapterPage() {
    const currChapter = useAppSelector(state => state.chapterPage.currentChapter)

    const readingSettings = useAppSelector(state => state.readingSettings)

    const [navOpen, setNavOpen] = useState<boolean>(true)
    const [endOpen, setEndOpen] = useState<boolean>(false)

    if (!currChapter) return;

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
                { getAligment(currChapter, readingSettings) == "vertical" ?
                    <VerticalScreen />
                    :
                    <HorizontalScreen />
                }
            </Box>
            <NavigationButtons />
        </NavOpenContext.Provider>
    )
}
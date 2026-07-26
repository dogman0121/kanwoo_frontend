"use client"

import { Box } from "@mui/material"
import Header, { PageHeader } from "./_components/Header"
import { useAppSelector } from "@/lib/state/hooks"
import Chapter from "@/types/chapter/chapter"
import HorizontalScreen from "./_components/HorizontalScreen"
import VerticalScreen from "./_components/VerticalScreen"
import NavigationButtons from "./_components/NavigationButtons"
import { useState } from "react"
import { ReadingSettingsState } from "@/lib/state/features/readingSettings/readingSettingsSlice"
import NavOpenContext from "./_contexts/navOpenContext"
import PageNumber from "./_components/PageNumber"

function getAligment(chapter: Chapter, readingSettings: ReadingSettingsState){
    if (readingSettings.aligment == "auto") {
        const mangaType = chapter?.manga?.type.id;
    
        if (mangaType == 1)
            return "vertical"
        else
            return "horizontal"
    }

    return readingSettings.aligment
}

export default function Page() {
    const currChapter = useAppSelector(state => state.chapterPage.currentChapter)

    const readingSettings = useAppSelector(state => state.readingSettings)

    const [navOpen, setNavOpen] = useState<boolean>(true)
    const [endOpen, setEndOpen] = useState<boolean>(false)

    if (!currChapter)
        return null

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
"use client"

import { useAppSelector } from "@/lib/state/hooks";
import { Chip } from "@mui/material";
import { useContext } from "react";
import NavOpenContext from "../_contexts/navOpenContext";

export default function PageNumber() {
    const {open, endOpen} = useContext(NavOpenContext)

    const readingSettings = useAppSelector(state => state.readingSettings)
    const currentChapterPage = useAppSelector(state => state.chapterPage.currentChapterPage)
    const currentChapter = useAppSelector(state => state.chapterPage.currentChapter)

    if (typeof currentChapterPage == "undefined") return null;
    if (!currentChapter || !currentChapter.pages) return null;

    if (!readingSettings.pageNumbers) return null
    
    if (endOpen) return null;

    return (
        <Chip
            sx={{
                position: "fixed",
                top: "15%",
                right: "50%",
                transform: "translateX(50%)",

                opacity: open ? 1 : 0,
                transition: ".3s",
                bgcolor: "rgba(0, 0, 0, 0.6)",

                zIndex: 50
            }}
            label={`${currentChapterPage+1} из ${currentChapter.pages.length}`} 
        />
    )
}
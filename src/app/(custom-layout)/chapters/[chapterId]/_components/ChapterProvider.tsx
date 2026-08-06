"use client"

import { initChapterPageChapter, setReadingProgress } from "@/lib/state/features/chapterPage/chapterPageSlice";
import { useAppStore } from "@/lib/state/hooks";
import Chapter from "@/types/chapter/chapter";
import ReadingProgress from "@/types/manga/readingProgress";
import { Children, useRef } from "react";

export default function ChapterProvider({
    chapter, 
    readingProgress,
    children
}: {
    chapter: Chapter, 
    readingProgress: ReadingProgress,
    children: React.ReactNode
}) {
    
    const store = useAppStore()
    const initialized = useRef(false)
    if (!initialized.current) {
        //console.log(chapter)
        store.dispatch(initChapterPageChapter(chapter))
        store.dispatch(setReadingProgress(readingProgress))
        initialized.current = true
    }


    return (
        <>
            {Children.map(children, c => c)}
        </>
    )
}
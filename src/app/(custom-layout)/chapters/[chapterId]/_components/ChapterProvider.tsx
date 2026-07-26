"use client"

import { initChapterPageChapter, setReadingProgress } from "@/lib/state/features/chapterPage/chapterPageSlice";
import { useAppDispatch } from "@/lib/state/hooks";
import Chapter from "@/types/chapter/chapter";
import ReadingProgress from "@/types/manga/readingProgress";
import { Children, useEffect } from "react";

export default function ChapterProvider({
    chapter, 
    readingProgress,
    children
}: {
    chapter: Chapter, 
    readingProgress: ReadingProgress,
    children: React.ReactNode
}) {
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(initChapterPageChapter(chapter))
        dispatch(setReadingProgress(readingProgress))
    }, [chapter])

    return (
        <>
            {Children.map(children, c => c)}
        </>
    )
}
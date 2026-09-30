"use client"

import { setManga } from "@/features/manga/states/manga-page/page/slice"
import { setProgress } from "@/features/manga/states/manga-page/progress/slice"
import { useAppDispatch } from "@/lib/state/hooks"
import { Manga, MangaContext, MangaMetadata } from "@/types/manga"
import { ReadingProgress, ReadingProgressContext, ReadingProgressMetadata } from "@/types/reading-progress"
import React, { Children, useEffect } from "react"
import { addManga } from "@/features/global/states/manga/slice"

export interface PPageProps {
    manga: Manga,
    mangaMetadata: MangaMetadata,
    mangaContext: MangaContext,
    readingProgress: ReadingProgress,
    readingProgressMetadata: ReadingProgressMetadata,
    readingProgressContext: ReadingProgressContext
    children: React.ReactElement
}

export default function PPage({
    manga,
    mangaMetadata,
    mangaContext,
    readingProgress,
    readingProgressMetadata,
    readingProgressContext,
    children
}: PPageProps) {
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(setManga(manga.slug))

        dispatch(addManga({
            manga: manga,
            mangaContext: mangaContext
        }))

        dispatch(setProgress({
            progress: readingProgress,
            context: readingProgressContext
        }))
                
    }, [
        manga, 
        mangaMetadata, 
        mangaContext, 
        readingProgress, 
        readingProgressMetadata, 
        readingProgressContext
    ])
    
    useEffect(() => {
        navigator.sendBeacon(`/api/manga/${manga.slug}/views`)

    }, [manga])

    return (
        <>
            {Children.map(children, c => c)}
        </>
    )
}
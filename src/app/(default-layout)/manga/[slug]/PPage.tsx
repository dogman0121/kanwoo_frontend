"use client"

import { setManga } from "@/lib/state/features/manga-page/page/slice"
import { setProgress } from "@/lib/state/features/manga-page/progress/slice"
import { useAppDispatch } from "@/lib/state/hooks"
import { Manga, MangaContext, MangaMetadata } from "@/types/manga"
import { ReadingProgress, ReadingProgressContext, ReadingProgressMetadata } from "@/types/reading-progress"
import { useEffect } from "react"
import DesktopPage from "./DesktopPage"
import MobilePage from "./MobilePage"
import { addManga } from "@/features/global/states/manga/slice"

export interface PPageProps {
    manga: Manga,
    mangaMetadata: MangaMetadata,
    mangaContext: MangaContext,
    readingProgress: ReadingProgress,
    readingProgressMetadata: ReadingProgressMetadata,
    readingProgressContext: ReadingProgressContext
    deviceType: string
}

export default function PPage({
    manga,
    mangaMetadata,
    mangaContext,
    readingProgress,
    readingProgressMetadata,
    readingProgressContext,
    deviceType   
}: PPageProps) {
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(setManga(manga.id))

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
    
    return (
        <>
            {deviceType == "desktop" ?
                <DesktopPage manga={manga}/>
                :
                <MobilePage manga={manga}/>
            }
        </>
    )
}
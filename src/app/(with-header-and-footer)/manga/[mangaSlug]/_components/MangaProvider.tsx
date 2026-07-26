"use client"

import { setMangaPageManga, setMangaPagePermissions, setMangaPageReadingProgress } from "@/lib/state/features/mangaPage/mangaSlice"
import Manga from "@/types/manga/manga"
import MangaPermission from "@/types/manga/mangaPermission"
import ReadingProgress from "@/types/manga/readingProgress"
import { Children, useEffect } from "react"
import { useDispatch } from "react-redux"

export default function MangaProvider({
    manga,
    mangaPermission,
    readingProgress,
    children
}: {
    manga: Manga,
    mangaPermission: MangaPermission,
    readingProgress: ReadingProgress,
    children: React.ReactNode
}) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setMangaPageManga(manga)),
        dispatch(setMangaPagePermissions(mangaPermission))
        dispatch(setMangaPageReadingProgress(readingProgress))
    }, [manga, mangaPermission])

    return (
        <>
            {Children.map(children, c => c)}
        </>
    )
}
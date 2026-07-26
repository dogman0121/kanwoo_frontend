"use client"

import { 
    setStudioPageManga, 
    setStudioPageMangaPermissions 
} from "@/lib/state/features/studioPage/studioPageMangaSlice"
import Manga from "@/types/manga/manga"
import MangaPermission from "@/types/manga/mangaPermission"
import { Children, useEffect } from "react"
import { useDispatch } from "react-redux"

export default function StudioMangaProvider({
    manga,
    mangaPermission,
    children
}: {
    manga: Manga,
    mangaPermission: MangaPermission,
    children: React.ReactNode
}) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setStudioPageManga(manga)),
        dispatch(setStudioPageMangaPermissions(mangaPermission))
    }, [manga, mangaPermission])

    return (
        <>
            {Children.map(children, c => c)}
        </>
    )
}
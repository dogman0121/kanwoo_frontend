"use client"

import { setManga } from "@/lib/state/features/manga/mangaSlice";
import { useAppStore } from "@/lib/state/hooks";
import Manga from "@/types/manga";
import { useRef } from "react";

export default function MangaProvider({manga, children}: {manga: Manga, children: React.ReactNode}) {
    const store = useAppStore()
    const initialized = useRef(false)
    if (!initialized.current) {
        store.dispatch(setManga(manga))
        initialized.current = true
    }

    return (
        <>{children}</>
    )
}
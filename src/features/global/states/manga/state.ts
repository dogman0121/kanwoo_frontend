"use client"

import { Manga, MangaContext, MangaMetadata } from "@/types/manga"
import { mangaAdapter } from "./adapters"

export interface MangaBlock {
    manga: Manga,
    mangaContext: MangaContext,
}

export const initialState = mangaAdapter.getInitialState()

export type MangaState = typeof initialState

export type RootState = {
    global: {manga: MangaState}
}
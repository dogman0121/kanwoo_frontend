"use client"

import { Manga, MangaContext, MangaMetadata, MangaPermission } from "@/types/manga"
import { mangaAdapter } from "./adapters"
import { Entity } from "@/lib/types/Entity.type"

export type MangaEntity = Entity<Manga, MangaContext, MangaPermission>

export interface MangaBlock {
    manga: MangaEntity
}

export const initialState = mangaAdapter.getInitialState()

export type MangaState = typeof initialState

export type RootState = {
    manga: MangaState
}
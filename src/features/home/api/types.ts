import { MangaShort } from "@/types/manga"
import { ReadingProgress, ReadingProgressContext } from "@/types/reading-progress"
import { Hero } from "../types"

export type GetHomeData = {
    progress: ReadingProgress[],
    hero: Hero[],
    newest: MangaShort[],
    most_viewed: MangaShort[],
    ended: MangaShort[],
}

export type GetHomeContext = {
    progress: ReadingProgressContext[]
}
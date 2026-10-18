import { Manga, MangaContext, MangaMetadata } from "@/types/manga"
import { ReadingProgress, ReadingProgressContext, ReadingProgressMetadata } from "@/types/reading-progress"

export type MangaPageData = {
    manga: Manga,
    progress: ReadingProgress
}

export type MangaPageMetadata = {
    manga: MangaMetadata,
    progress: ReadingProgressMetadata
}

export type MangaPageContext = {
    manga: MangaContext
    progress: ReadingProgressContext
}
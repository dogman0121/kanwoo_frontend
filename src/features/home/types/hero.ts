import { ChapterShort } from "@/types/chapter"
import { MangaShort } from "@/types/manga"

type HeroManga = {
    slug: string
    logo: string,
    name: string,
    background: string,
}

export type Hero = {
    type: "add" | "manga",
    data: HeroManga
}

export type HomeProgresses = {
    id: number,
    page: number,
    chapter: ChapterShort,
    manga: MangaShort
}

export type HomeBlockData = Hero[] | HomeProgresses[] | MangaShort[] | ChapterShort[]

export type HomeMapItem = {
    type: "manga_list" | "hero" | "reading_progresses" | "last_added_chapters",
    hash: string | null,
    title: string
}

export type HomeMap = HomeMapItem[]
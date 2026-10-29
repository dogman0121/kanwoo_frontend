import { Chapter } from "@/features/chapter/types/chapter.type"
import { CursorPagination } from "@/lib/fetch/api-response.types"
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

export type LastAddedChaptersBlock = {chapters : Chapter[], pagination: CursorPagination}

export type HomeBlockData = Hero[] | HomeProgresses[] | MangaShort[] | LastAddedChaptersBlock

export type HomePageItem = {
    type: "manga_list" | "hero" | "reading_progresses" | "last_added_chapters",
    hash: string,
    title: string
}

export type HomePageMap = HomePageItem[]
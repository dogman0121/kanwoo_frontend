import { Chapter } from "@/features/chapter/types/chapter.type"
import { MangaShort } from "@/features/manga/types"

export type ProgressSave = {
    id: number,
    page: number,
    chapter: Chapter,
    manga: MangaShort,
    status: "started" | "finished" | "not_started"
}
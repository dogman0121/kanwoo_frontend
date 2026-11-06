import { ChapterShort } from "@/features/chapter/types/chapter.type"

export type ReadingSave = {
    id: number,
    chapter: ChapterShort,
    status: "not_started" | "started" | "finished"
}
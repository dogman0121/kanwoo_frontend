import { Chapter } from "@/features/chapter/types/chapter.type"

export type ReadingStart = {
    start_type: "no_chapters" | "continue" | "start",
    chapter: Chapter 
}
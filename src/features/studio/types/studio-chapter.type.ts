import { Chapter } from "@/features/chapter/types/chapter.type";

export type StudioChapter = Chapter & {
    stats: {
        views: number,
        comments: number
    }
}
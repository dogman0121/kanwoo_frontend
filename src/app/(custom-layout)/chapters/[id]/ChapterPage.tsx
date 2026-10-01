"use client"

import KanwooReader from "@/features/reader/components/KaReader"
import { Chapter, ChapterContext } from "@/types/chapter"

export default function ChapterPage({
    chapterID
}: {
    chapterID: number
}) {

    return (
        <KanwooReader
            initChapterID={chapterID}
        />
    )
}
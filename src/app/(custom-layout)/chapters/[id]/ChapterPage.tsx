"use client"

import KanwooReader from "@/features/reader/components/KaReader"

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
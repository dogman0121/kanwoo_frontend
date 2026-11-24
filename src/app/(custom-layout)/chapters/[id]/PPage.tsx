"use client"

import ChapterPage from "./ChapterPage";

export default function PPage({
    chapterID
}: {
    chapterID: number
}) {

    return (
        <ChapterPage 
            chapterID={chapterID}
        />
    )
}
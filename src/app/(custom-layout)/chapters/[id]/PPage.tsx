"use client"

import { Chapter, ChapterContext, ChapterMetadata } from "@/types/chapter";
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
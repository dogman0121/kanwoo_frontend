import { Metadata } from "next"
import ChapterPage from "./ChapterPage"
import { notFound } from "next/navigation"
import { chapterServerApi } from "@/features/chapter/api/server.api"
import Adapter from "./PPage"
import PPage from "./PPage"

export async function generateMetadata({ 
    params 
}: {
    params: Promise<{id: string}>
}): Promise<Metadata>  {
    const {id} = await params;

    const chapterID = parseInt(id)

    const {data: chapter, context: {manga}} = await chapterServerApi.getChapter(chapterID)

    return {
        title: chapter.name ? `Глава ${chapter.id} ${chapter.name} ${manga.name} | kanwoo`  : `Глава ${chapter.id} ${manga.name} | kanwoo`
    }
}

export default async function Page({
    params
}: {
    params: Promise<{id: string}>
}) {
    const { id } = await params;

    try {
        const chapterID = parseInt(id)

        return (
            <PPage 
                chapterID={chapterID}
            />
        )
    } catch(e) {
        notFound()
    }
}
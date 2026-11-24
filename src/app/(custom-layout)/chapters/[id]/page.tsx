import { Metadata } from "next"
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

    const {data: metadata} = await chapterServerApi.getChapterMetadata(chapterID)

    return {
        title: metadata.title,
        openGraph: {
            title: metadata.title,
            url: metadata.canonical,
        }
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
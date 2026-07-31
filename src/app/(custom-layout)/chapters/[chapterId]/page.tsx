import { Metadata } from "next"
import ChapterProvider from "./_components/ChapterProvider"
import { serverFetch } from "@/lib/fetch/serverFetch"
import Chapter from "@/types/chapter/chapter"
import ReadingProgress from "@/types/manga/readingProgress"
import ChapterPageDynamic from "./ChapterPageDynamic"

export async function generateMetadata({ 
    params 
}: {
    params: Promise<{chapterId: string}>
}): Promise<Metadata>  {
    const {chapterId} = await params;

    const response = await serverFetch.get<{chapter: Chapter, readingProgress: ReadingProgress}>(`/chapters/${chapterId}`)

    const {chapter} = response.data;

    return {
        title: chapter.name ? `Глава ${chapter.id} ${chapter.name} ${chapter.manga.name} | kanwoo`  : `Глава ${chapter.id} ${chapter.manga.name} | kanwoo`
    }
}

export default async function Page({
    params
}: {
    params: Promise<{chapterId: string}>
}) {
    const {chapterId} = await params;

    const response = await serverFetch.get<{chapter: Chapter, readingProgress: ReadingProgress}>(`/chapters/${chapterId}`)

    const {chapter, readingProgress} = response.data;

    return (
        <ChapterProvider
            chapter={chapter}
            readingProgress={readingProgress}
        >
            <ChapterPageDynamic />
        </ChapterProvider>
    )
}
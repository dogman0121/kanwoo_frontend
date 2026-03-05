import { fetchApi, fetchManyApi } from "@/lib/api/fetchApi";
import Chapter from "@/types/chapter/chapter";
import ReadingProgress from "@/types/manga/readingProgress";

export interface GetChapterResponse {
    chapter: Chapter,
    reading_progress: ReadingProgress
}

export async function GET(request: Request, 
    { params }: { params: Promise<{chapterId: string}> }
) {
    const { chapterId } = await params;

    return fetchManyApi(request, [
        {name: "chapter", url: `/chapters/${chapterId}`, options: {method: "GET"}},
        {name: "reading_progress", url: `/chapters/${chapterId}/progress`, options: {method: "GET"}}
    ])
}
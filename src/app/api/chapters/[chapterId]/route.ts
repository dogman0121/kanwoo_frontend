import { fetchApi, fetchManyApi, HTTP_METHODS } from "@/lib/api/fetchApi";
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

    return fetchApi(request, `/chapters/${chapterId}`, HTTP_METHODS.GET)
}
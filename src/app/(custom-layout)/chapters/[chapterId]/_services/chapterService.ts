"use client"

import { GetChapterResponse } from "@/app/api/chapters/[chapterId]/route";
import { clientFetch } from "@/lib/fetch/clientFetch";
import Chapter from "@/types/chapter/chapter";

class ChapterService {
    async getNextChapter(currChapter: Chapter) {
        const response = await clientFetch.get<GetChapterResponse>(`/chapters/${currChapter.next_chapter_id}`)

        return response.data.chapter
    }

    async saveProgress(chapter: Chapter, page: number) {
        const {data: success} = await clientFetch.post<{"success": boolean}>(`/chapters/${chapter.id}/progress`, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                page: page
            })
        })

        return success
    }
}

export const chapterService = new ChapterService()
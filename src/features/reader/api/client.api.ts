import { clientFetch } from "@/lib/fetch/client-fetch.util"
import { Chapter, ChapterContext, ChapterMetadata } from "@/types/chapter"
import { ReadingProgress, ReadingProgressContext } from "@/types/reading-progress"

export const readerClientAPI = {
    getChapter: async(chapterID: number) => {
        return clientFetch.get<Chapter, null, ChapterContext>(`/chapters/${chapterID}`)
    },

    getChapterProgress: async(chapterID: number) => {
        return clientFetch.get<ReadingProgress, null, ReadingProgressContext>(`/chapters/${chapterID}/progress`) 
    },

    createSession: async(chapterID: number, pageNumber: number) => {
        return clientFetch.post<{id: number}>(`/sessions`, {
            body: JSON.stringify({
                chapter_id: chapterID,
                page: pageNumber
            })
        }, {use_json: true})
    },

    saveProgress: async(sessionID: number, pageNumber: number) => {
        return clientFetch.put(`/sessions/${sessionID}`, {
            body: JSON.stringify({
                page: pageNumber
            })
        }, {use_json: true})
    }
}
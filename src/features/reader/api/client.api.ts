import { ChapterContext } from "@/features/chapter/types"
import { Chapter } from "@/features/chapter/types/chapter.type"
import { clientFetch } from "@/lib/fetch/client-fetch.util"
import { ReadingProgress, ReadingProgressContext } from "@/types/reading-progress"

export const readerClientAPI = {
    getChapter: async(chapterID: number) => {
        return clientFetch.get<Chapter, null, ChapterContext>(`/chapters/${chapterID}`)
    },

    getChapterProgress: async(chapterID: number) => {
        return clientFetch.get<ReadingProgress, null, ReadingProgressContext>(`/progresses/chapters/${chapterID}`) 
    },

    getReadingSession: async(translationID: number) => {
        const urlSearchParams = new URLSearchParams({translation_id: translationID.toString()})
        return clientFetch.get<{id: number}>(`/progresses/reading-sessions?` + urlSearchParams.toString())
    },

    updateSession: async(sessionID: number, chpaterID: number, pageNumber: number, isFinished: boolean) => {
        return clientFetch.patch(`/progresses/reading-sessions/${sessionID}`, {
            body: JSON.stringify({
                chapter_id: chpaterID,
                page: pageNumber,
                is_finished: isFinished
            })
        }, {use_json: true})
    }
}
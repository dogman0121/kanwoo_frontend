import { clientFetch } from "@/lib/fetch/client-fetch.util"
import { HomeBlockData, HomeProgresses } from "../types/hero"
import { ReadingProgress, ReadingProgressContext } from "@/types/reading-progress"
import { Chapter, ChapterContext } from "@/types/chapter"
import { CursorPagination } from "@/lib/fetch/api-response.types"
import encodeCursor from "@/lib/fetch/encode-cursor.util"

export const homeClientAPI = {
    getHomeBlock: async(hash: string) => {
        return clientFetch.get<HomeBlockData>(`/home/blocks/${hash}`)
    },

    getProgresses: async () => {
        return clientFetch.get<ReadingProgress[], null, ReadingProgressContext[]>('/progresses')
    },

    getLastAddedChapters: async (cursor?: Record<string, unknown>) => {
        const urlParams = new URLSearchParams()
        if (cursor)
            urlParams.set("cursor", encodeCursor(cursor))

        return clientFetch.get<Chapter[], null, ChapterContext[], CursorPagination>('/chapters/last-added' + urlParams.toString())
    }
}
import { clientFetch } from "@/lib/fetch/client-fetch.util"
import { HomeBlockData, HomeChapter, HomeProgresses } from "../types/hero"
import { ReadingProgress, ReadingProgressContext } from "@/types/reading-progress"
import { Chapter, ChapterContext } from "@/types/chapter"
import { CursorPagination } from "@/lib/fetch/api-response.types"
import encodeCursor from "@/lib/fetch/encode-cursor.util"

export const homeClientAPI = {
    getHomeBlocks: async(hashList: string[]) => {
        return clientFetch.post<HomeBlockData[]>(`/home/blocks`, {
            body: JSON.stringify({
                blocks_hash: hashList
            })
        }, {use_json: true, csrf: false})
    },

    getProgresses: async () => {
        return clientFetch.get<ReadingProgress[], null, ReadingProgressContext[]>('/progresses')
    },

    getLastAddedChapters: async (cursor?: Record<string, unknown>) => {
        const urlParams = new URLSearchParams()
        if (cursor)
            urlParams.set("cursor", encodeCursor(cursor))

        return clientFetch.get<HomeChapter[], null, null, CursorPagination>('/chapters/last-added?' + urlParams.toString())
    }
}
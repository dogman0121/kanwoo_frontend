import ReadingProgresss from "@/features/home/components/sliders/progress/ReadingProgress"
import { CursorPagination } from "@/lib/fetch/api-response.types"
import { clientFetch } from "@/lib/fetch/client-fetch.util"
import encodeCursor from "@/lib/fetch/encode-cursor.util"
import { ReadingProgress, ReadingProgressContext } from "@/types/reading-progress"

export const progressClientAPI = {
    getHistory: async (cursor?: Record<string, unknown>) => {
        const urlParams = new URLSearchParams()
        if (cursor)
            urlParams.set("cursor", encodeCursor(cursor))

        const response = await clientFetch.get<ReadingProgress[], null, ReadingProgressContext[], CursorPagination>("/history?" + urlParams.toString())

        return response
    },

    getProgresses: async() => {
        return await clientFetch.get<ReadingProgress[], null, ReadingProgressContext[]>("/progresses")
    }
}
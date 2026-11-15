import { serverFetch } from "@/lib/fetch/server-fetch.util"
import { GetChapterPageResponseData, GetChapterPageResponseMetadata, GetChapterPageResponsePagination } from "./types"
import { Chapter, ChapterContext, ChapterMetadata } from "@/types/chapter"
import { PageMetadata } from "@/lib/types/PageMetadata.type"

export const chapterServerApi = {

    getChapterMetadata: async (chapterID: number) => {
        return serverFetch.get<PageMetadata>(`/chapters/${chapterID}/metadata`)
    },

    getChapterPage: async (chapterId: number) => {
        const result = await serverFetch.get<
            GetChapterPageResponseData, 
            GetChapterPageResponseMetadata, 
            null, 
            GetChapterPageResponsePagination
        >(`/chapters/${chapterId}/pages/main`)

        return result
    },
    getChapter: async (chapterId: number) => {
        const result = await serverFetch.get<Chapter, ChapterMetadata, ChapterContext>(`/chapters/${chapterId}`)

        return result
    },
}
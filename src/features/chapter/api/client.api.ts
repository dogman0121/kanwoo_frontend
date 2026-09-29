"use client"

import { clientFetch } from "../../../lib/fetch/client-fetch.util"
import encodeCursor from "../../../lib/fetch/encode-cursor.util"
import { CursorPagination } from "../../../lib/fetch/api-response.types"
import { Chapter, ChapterContext, ChapterMetadata } from "@/types/chapter"
import { ReadingProgress } from "@/types/reading-progress"
import { Comment, CommentContext } from "@/types/comment"
import { GetChapterPageResponseData, GetChapterPageResponseMetadata } from "./types"


export const chapterClientApi = {

    getChapterPage: async (chapterId: number) => {
        const result = await clientFetch.get<GetChapterPageResponseData, GetChapterPageResponseMetadata>(`/chapters/${chapterId}/pages/main`)

        return result
    },
    
    getChapter: async (chapterId: number) => {
        const result = await clientFetch.get<Chapter, ChapterMetadata, ChapterContext>(`/chapters/${chapterId}`)

        return result
    },
    getComments: async (chapterId: number, cursor?: Record<string, unknown>, limit?: number) => {
        const urlParams = new URLSearchParams()
        if (limit)
            urlParams.set("limit", limit.toString())

        if (cursor)
            urlParams.set('cursor', encodeCursor(cursor))

        const result = await clientFetch.get<Comment[], null, CommentContext[], CursorPagination>(`/chapters/${chapterId}/comments?` + urlParams.toString())

        return result
    },
    getCommentsPreview: async (chapterId: number) => {
        const result = await clientFetch.get<Comment[], {total_count: number}, CommentContext[], CursorPagination>(`/chapters/${chapterId}/comments/preview`)

        return result
    },
    addComment: async (chapterId: number, commentText: string) => {
        const response = await clientFetch.post<Comment, null, CommentContext>(`/chapters/${chapterId}/comments`, {
            body: JSON.stringify({
                text: commentText
            })
        }, {use_json: true})

        return response
    },
    getReadingProgress: async (chapterId: number) => {
        const response = await clientFetch.get<ReadingProgress>(`/chapters/${chapterId}/progress`)

        return response
    },
    saveProgress: async (chapterId: number, page: number) => {
        const response = await clientFetch.post<ReadingProgress>(`/chapters/${chapterId}/progress`, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                page: page
            })
        })

        return response
    }
}
"use client"

import { clientFetch } from "../../client-fetch.util"
import { CursorPagination } from "../../api-response.types"
import encodeCursor from "../../encode-cursor.util"
import { Comment, CommentContext } from "@/features/comment/types"
import { DiscussionComment } from "@/features/comment/types/discussion-comment.type"
import { Subthread, SubthreadContext } from "@/features/comment/types/subthread"

export const commentsClientApi = {
    getPreview: async (type: "manga" | "chapter" | "post", entityId: number | string) => {
        const urlParams = new URLSearchParams()
        urlParams.set("type", type)
        urlParams.set("id", entityId.toString())

        const response = await clientFetch.get<Comment[], {total_count: number}, null, CursorPagination>("/comments/preview?" + urlParams.toString())

        return response
    },

    getComments: async (
        type: "manga" | "chapter" | "post", 
        entityId: number | string, 
        cursor?: Record<string, unknown>,
        limit?: number
    ) => {
        const urlParams = new URLSearchParams()
        urlParams.set("type", type)
        urlParams.set("id", entityId.toString())

        if (cursor)
            urlParams.set("cursor", encodeCursor(cursor))
        if (limit)
            urlParams.set("limit", limit.toString())

        const response = await clientFetch.get<Comment[], null, null, CursorPagination>("/comments?" + urlParams.toString())

        return response
    },

    addComment: async (type: "manga" | "chapter" | "post", entityId: number | string, text: string) => {
        const urlParams = new URLSearchParams()
        urlParams.set("type", type)
        urlParams.set("id", entityId.toString())

        const response = await clientFetch.post<Comment, null, CommentContext>("/comments" + urlParams.toString())

        return response
    },

    addReply: async (parentId: number, text: string) => {
        const response = await clientFetch.post<Comment, null, CommentContext>(`/comments/${parentId}/replies`, {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                text: text,
            })
        })
        
        return response
    },

    getSubthreads: async (commentId: number, cursor?: Record<string, unknown>, limit?: number) => {
        const queryParams = new URLSearchParams()

        if (cursor)
            queryParams.set("cursor", encodeCursor(cursor))
        if (limit)
            queryParams.set("limit", limit.toString())

        return await clientFetch.get<Subthread[], null, SubthreadContext[], CursorPagination>(`/comments/${commentId}/subthreads?` + queryParams.toString())
    },

    getDiscussion: async (subthreadId: number, cursor?: Record<string, unknown>, limit?: number) => {
        const queryParams = new URLSearchParams()

        if (cursor)
            queryParams.set("cursor", encodeCursor(cursor))
        if (limit)
            queryParams.set("limit", limit.toString())

        return await clientFetch.get<DiscussionComment[], null, CommentContext[], CursorPagination>(`/comments/subthreads/${subthreadId}/discussion?` + queryParams.toString())
    },

}
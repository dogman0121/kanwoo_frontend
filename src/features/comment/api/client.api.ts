"use client"

import { Comment, CommentContext } from "@/features/comment/types"
import { DiscussionComment } from "@/features/comment/types/discussion-comment.type"
import { Subthread, SubthreadContext } from "@/features/comment/types/subthread"
import { CursorPagination } from "@/lib/fetch/api-response.types"
import { clientFetch } from "@/lib/fetch/client-fetch.util"
import encodeCursor from "@/lib/fetch/encode-cursor.util"

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

    voteComment: async (commentId: number, vote: number) => {
        const response = await clientFetch.patch(`/comments/${commentId}/votes`, {
            body: JSON.stringify({vote: vote})
        }, {use_json: true})

        return response
    }
}
"use client"

import { Comment, CommentContext } from "@/types/comment"
import { clientFetch } from "../../client-fetch.util"
import { CursorPagination } from "../../api-response.types"
import encodeCursor from "../../encode-cursor.util"

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
        const response = await clientFetch.post<Comment, null, CommentContext>(`/comments`, {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                text: text,
                parent: parentId
            })
        })
        
        return response
    }
}
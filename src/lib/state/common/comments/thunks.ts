import { createAsyncThunk } from "@reduxjs/toolkit"
import { CommentsBlock } from "./state"
import { chapterClientApi } from "@/features/chapter/api/client.api"
import { mangaClientApi } from "@/lib/fetch/features/manga/client.api"
import { CursorPagination, SuccessResponse } from "@/lib/fetch/api-response.types"
import { addComment, addCommentList } from "@/features/comment/states/comments/slice"
import { Comment, CommentContext } from "@/features/comment/types"
import { addThread, addThreadsList } from "@/features/comment/states/threads/slice"

export function makeThunks(
    sliceName: string, 
    options: {
        type: "manga" | "chapter" | "post"
    }
) {
    const fetchCommentsPreview = createAsyncThunk(
        `${sliceName}/fetchPreviewStatus`,
        async (entityId: number | string, thunkAPI) => {
            let response: SuccessResponse<Comment[], {total_count: number}, CommentContext[], CursorPagination, null> | null = null;
            switch (options.type) {
                case "chapter":
                    response = await chapterClientApi.getCommentsPreview(entityId as number)
                    break
                case "manga":
                    response = await mangaClientApi.getCommentsPreview(entityId as string)
                    break
            }

            if (!response) throw new Error("Failed to fetch preview")
            
            thunkAPI.dispatch(addThreadsList({comments: response.data}))
            thunkAPI.dispatch(addCommentList(
                response.data.map((c, idx) => ({
                    data: c,
                    context: response.context[idx]
                }))
            ))

            return {
                entityId: entityId,
                response: response
            }
        }
    )

    const fetchComments = createAsyncThunk(
        `${sliceName}/fetchCommentsStatus`,
        async (commentsBlock: CommentsBlock, thunkAPI) => {
            let response: SuccessResponse<Comment[], null, CommentContext[], CursorPagination, null> | null = null;
            switch (options.type) {
                case "chapter":
                    response = await chapterClientApi.getComments(commentsBlock.entityId as number, commentsBlock.cursor, commentsBlock.limit)
                    break
                case "manga":
                    response = await mangaClientApi.getComments(commentsBlock.entityId as string, commentsBlock.cursor, commentsBlock.limit)
                    break

            }

            if (!response) throw new Error("Failed to fetch comments")

            thunkAPI.dispatch(addThreadsList({comments: response.data}))
            thunkAPI.dispatch(addCommentList(
                response.data.map((c, idx) => ({
                    data: c,
                    context: response.context[idx]
                }))
            ))

            return {
                entityId: commentsBlock.entityId,
                response: response
            }
        }
    )

    const sendComment = createAsyncThunk(
        `${sliceName}/sendCommentStatus`, 
        async (data: {commentsBlock: CommentsBlock, text: string}, thunkAPI) => {
            let response: SuccessResponse<Comment, null, CommentContext, null, null> | null = null;
            switch (options.type) {
                case "chapter":
                    response = await chapterClientApi.addComment(data.commentsBlock.entityId as number, data.text)
                    break
                case "manga":
                    response = await mangaClientApi.addComment(data.commentsBlock.entityId as string, data.text)
                    break
            }

            if (!response) throw new Error("Failed to fetch comments")

            const comment = response.data
            const commentContext = response.context

            thunkAPI.dispatch(addThread({comment: comment}))
            thunkAPI.dispatch(addComment({data: comment, context: commentContext}))

            return {
                entityId: data.commentsBlock.entityId,
                response: response
            }
        }
    )

    return {
        fetchComments,
        fetchCommentsPreview,
        sendComment
    }
}
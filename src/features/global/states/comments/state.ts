"use client"

import { commentsAdapter } from "./adapters"
import { Comment, CommentContext, CommentMetadata } from "@/types/comment"

export interface CommentBlock {
    comment: Comment,
    commentContext: CommentContext,
    replies: number[],
    repliesCursor?: Record<string, unknown>
    repliesTotalCount: number
}

export const initialState = commentsAdapter.getInitialState()

export type CommentsState = typeof initialState

export type RootState = {
    global: {comments: CommentsState}
}
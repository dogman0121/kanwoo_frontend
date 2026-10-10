"use client"

import { Comment } from "@/features/comment/types/comment.type"
import { commentsAdapter } from "./adapters"
import { CommentContext } from "@/features/comment/types"
import { MoreButtonState } from "@/features/comment/components/ui/CommentMoreButton"

export interface CommentBlock {
    comment: Comment,
    commentContext: CommentContext,
    ui: {
        repliesInputOpen: boolean,
        repliesState: MoreButtonState
    }
}

export interface CommentState {
    ui: {
        inputOpen: boolean,
        replyContext: {
            parentCommentId: number | null,
            comment: Comment | null,
        }
    }
}

export const initialState = commentsAdapter.getInitialState({
    ui: {
        inputOpen: false,
        replyContext: {
            parentCommentId: null,
            comment: null
        }
    }
} as CommentState)

export type CommentsState = typeof initialState

export type RootState = {
    global: {comments: {comments: CommentsState}}
}
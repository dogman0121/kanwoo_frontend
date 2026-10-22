"use client"

import { Comment } from "@/features/comment/types/comment.type"
import { commentsAdapter } from "./adapters"
import { CommentContext } from "@/features/comment/types"
import { MoreButtonState } from "@/features/comment/components/ui/CommentMoreButton"
import { Entity } from "@/lib/types/Entity.type"

export type CommentEntity = Entity<Comment, CommentContext>

export interface CommentBlock {
    comment: CommentEntity,
    ui: {
        repliesInputOpen: boolean,
        repliesState: MoreButtonState
    }
}

export interface CommentState {
    ui: {
        inputOpen: boolean,
        replyContext: {
            parentCommentId: number | null, // Родитель комментария
            commentId: number | null, // На какой комментарий отвечаем
        }
    }
}

export const initialState = commentsAdapter.getInitialState({
    ui: {
        inputOpen: false,
        replyContext: {
            parentCommentId: null,
            commentId: null
        }
    }
} as CommentState)

export type CommentsState = typeof initialState

export type RootState = {
    comments: {comments: CommentsState}
}
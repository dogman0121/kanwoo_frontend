import { subthreadsAdapter } from "./adapters";
import { Comment } from "@/features/comment/types";
import { CursorPagination } from "@/lib/fetch/api-response.types";
import { CommentContext } from "@/types/comment";

export interface SubthreadBlock {
    rootCommentId: number,
    discussionIds: number[],
    discussionCursor?: Record<string, unknown>
    discussionHasMore: boolean
}

export const initialState = subthreadsAdapter.getInitialState()

export type SubthreadsState = typeof initialState

export type RootState = {
    global: {comments: {subthreads: SubthreadsState}}
}
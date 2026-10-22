import { subthreadsAdapter } from "./adapters";

export interface SubthreadBlock {
    rootCommentId: number,
    discussionIds: number[],
    discussionCursor?: Record<string, unknown>
    discussionHasMore: boolean
}

export const initialState = subthreadsAdapter.getInitialState()

export type SubthreadsState = typeof initialState

export type RootState = {
    comments: {subthreads: SubthreadsState}
}
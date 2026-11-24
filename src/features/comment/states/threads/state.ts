"use client"

import {threadAdapter } from "./adapters"

export interface ThreadBlock {
    rootCommentId: number,
    subthreadsIds: number[],
    subthreadsCursor?: Record<string, unknown>,
    subthreadsHasMore: boolean
}

export const initialState = threadAdapter.getInitialState()

export type ThreadState = typeof initialState

export type RootState = {
    comments: {threads: ThreadState}
}
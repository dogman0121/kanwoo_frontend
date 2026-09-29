import { EntityState } from "@reduxjs/toolkit"

export interface CommentsBlock {
    entityId: number | string,
    commentsIds: number[]
    cursor?: Record<string, unknown>,
    totalCount: number,
    hasMore: boolean,
    limit: number
}

export type CommentsState = EntityState<CommentsBlock, number | string>
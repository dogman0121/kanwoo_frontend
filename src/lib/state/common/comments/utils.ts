import { Comment } from "@/types/comment"
import { CommentsState } from "./state"

export function findIndex(id: number | string, ids: (number | string)[]) {
    const idx = ids.findIndex(currId => currId == id)
    return idx
}

export function findIndexOrError(id: number | string, ids: (number | string)[]) {
    const idx = findIndex(id, ids)

    if (idx == -1) throw new Error("Failed to get index")

    return idx
}

export function updatePagination(state: CommentsState, entityId: number | string, has_more: boolean, limit: number, cursor?: Record<string, unknown>) {
    const blockIdx = findIndexOrError(entityId, state.ids)
    const blockId = state.ids[blockIdx]

    state.entities[blockId].cursor = cursor
    state.entities[blockId].limit = limit
    state.entities[blockId].hasMore = has_more
}

export function setComments(state: CommentsState, entityId: number | string, comments: Comment[]) {
    const blockIdx = findIndexOrError(entityId, state.ids)
    const blockId = state.ids[blockIdx]

    const commentsIds = comments.map(c => c.id)

    state.entities[blockId].commentsIds = commentsIds
}

export function addComments(state: CommentsState, entityId: number | string, comments: Comment[]) {
    const blockIdx = findIndexOrError(entityId, state.ids)
    const blockId = state.ids[blockIdx]

    const commentsIds = comments.map(c => c.id)

    state.entities[blockId].commentsIds.push(...commentsIds)
}
import { Post } from "@/types/post"
import { postsAdapter } from "./adapters"

export interface PostBlock {
    id: number,
    post: Post,
    commentsCursor: Record<string, unknown>,
    commentsTotalCount: number
}

export interface PostsStateWithoutAdapter {
    cursor?: Record<string, unknown>,
    total_count?: number
}


export const initialState = postsAdapter.getInitialState()

export type PostsState = typeof initialState & PostsStateWithoutAdapter

export type RootState = {
    profilePage: { posts: PostsState }
}
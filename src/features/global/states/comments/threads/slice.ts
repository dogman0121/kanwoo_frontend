import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, ThreadBlock } from "./state";
import { threadAdapter } from "./adapters";
import { Comment, CommentContext } from "@/features/comment/types";
import { addSubthreadsList } from "../subthreads/slice";
import { commentsClientApi } from "@/features/comment/api/client.api";
import { addComment, addCommentList, addReply } from "../comments/slice";


export const fetchSubthreads = createAsyncThunk(
    "comments/fetchSubthreadsStatus", 
    async (threadBlock: ThreadBlock, thunkAPI) => {
        const response = await commentsClientApi.getSubthreads(threadBlock.rootCommentId, threadBlock.subthreadsCursor, 5)


        thunkAPI.dispatch(addSubthreadsList({
            subthreads: response.data,
        }))


        response.data.forEach((thread, idx) => {
            thunkAPI.dispatch(addComment({
                comment: thread.root_comment,
                commentContext: response.context[idx].root_comment
            }))
        })

        response.data.forEach((thread, idx) => {
            thunkAPI.dispatch(addCommentList({
                comments: thread.discussion,
                commentsContexts: response.context[idx].discussion
            }))
        })

        return {
            threadBlock: threadBlock,
            response: response
        }
    }
)

export const threadsSlice = createSlice({
    name: "threads",
    initialState,
    reducers: {
        addThread: (state, action: PayloadAction<{comment: Comment}>) => {
            const {comment} = action.payload

            threadAdapter.setOne(
                state,
                {
                    rootCommentId: comment.id,
                    subthreadsIds: [],
                    subthreadsHasMore: false,
                }
            )
        },
        addThreadsList: (state, action: PayloadAction<{comments: Comment[]}>) => {
            const {comments} = action.payload

            threadAdapter.setMany(
                state, 
                comments.map((comment, ind) => ({
                    rootCommentId: comment.id,
                    subthreadsIds: [],
                    subthreadsHasMore: comment.replies_count > 0,
                }))
            )
        },
    },
    extraReducers: (builder) => (builder
        .addCase(addReply.fulfilled, (state, action) => {
            const {response, parentCommentId, comment} = action.payload

            if (comment.id == null) {
                threadAdapter.addOne(state, {
                    rootCommentId: response.data.id,
                    subthreadsIds: [],
                    subthreadsHasMore: false,
                })
            } else if (parentCommentId == null && comment.id in state.entities) {
                state.entities[comment.id].subthreadsIds.unshift(response.data.id)
            }
        })
        .addCase(fetchSubthreads.fulfilled, (state, action) => {
            const {response, threadBlock} = action.payload

            const stateBlock = state.entities[threadBlock.rootCommentId]
            stateBlock.subthreadsCursor = response.pagination.cursor
            stateBlock.subthreadsHasMore = response.pagination.has_more

            for (let i of response.data) {
                if (stateBlock.subthreadsIds.findIndex(sID => sID == i.root_comment.id) == -1)
                    stateBlock.subthreadsIds.push(i.root_comment.id)
            }
        })
    )
})

export const { addThread, addThreadsList } = threadsSlice.actions

export default threadsSlice.reducer
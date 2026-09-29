import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { commentsAdapter } from "./adapters";
import { commentsClientApi } from "@/lib/fetch/features/comment/client.api";
import { Comment, CommentContext } from "@/types/comment";

export const addReply = createAsyncThunk(
    "comments/addReplyStatus",
    async (data: {parentId: number, text: string}, thunkAPI) => {
        const response = await commentsClientApi.addReply(data.parentId, data.text)

        thunkAPI.dispatch(addComment({comment: response.data, commentContext: response.context}))

        return {
            parentId: data.parentId,
            commentId: response.data.id
        }
    }
)

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<{comment: Comment, commentContext: CommentContext}>) => {
            const {comment, commentContext} = action.payload

            commentsAdapter.setOne(
                state,
                {
                    comment: comment,
                    commentContext: commentContext,
                    replies: [],
                    repliesTotalCount: comment.answers_count
                }
            )
        },
        addCommentList: (state, action: PayloadAction<{comments: Comment[], commentsContexts: CommentContext[]}>) => {
            const {comments, commentsContexts} = action.payload

            commentsAdapter.setMany(
                state, 
                comments.map((comment, ind) => ({
                    comment: comment,
                    commentContext: commentsContexts[ind],
                    replies: [],
                    repliesTotalCount: comment.answers_count
                }))
            )
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addReply.fulfilled, (state, action) => {
            state.entities[action.payload.parentId].replies.unshift(action.payload.commentId)
        })
    }
})

export const { addComment, addCommentList } = commentsSlice.actions

export default commentsSlice.reducer
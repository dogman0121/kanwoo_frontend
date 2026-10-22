import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentEntity, initialState } from "./state";
import { commentsAdapter } from "./adapters";
import { Comment, CommentContext } from "@/features/comment/types";
import { commentsClientApi } from "@/features/comment/api/client.api";
import { MoreButtonState } from "@/features/comment/components/ui/CommentMoreButton";

export const addReply = createAsyncThunk(
    "comments/addReplyStatus",
    async (data: {parentCommentId: number | null, comment: Comment, text: string}, thunkAPI) => {
        const {parentCommentId, comment, text} = data

        const response = await commentsClientApi.addReply(comment.id, text)

        const createdComment: Comment = {
            ...response.data,
            reply_to: comment.creator
        }
        thunkAPI.dispatch(addComment({
            data: createdComment,
            context: response.context
        }))

        return {
            parentCommentId: parentCommentId,
            comment: comment,
            text: text,
            response: response
        }
    }
)

export const voteComment = createAsyncThunk(
    "comments/voteCommentStatus",
    async (data: {commentId: number, vote: number}, thunkAPI) => {
        const {commentId, vote} = data

        commentsClientApi.voteComment(commentId, vote)

        return {
            commentId: commentId,
            vote: vote
        }
    }
)

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<CommentEntity>) => {

            commentsAdapter.setOne(
                state,
                {
                    comment: action.payload,
                    ui: {
                        repliesInputOpen: false,
                        repliesState: MoreButtonState.HIDDEN
                    }
                }
            )
        },
        addCommentList: (state, action: PayloadAction<CommentEntity[]>) => {

            commentsAdapter.setMany(
                state, 
                action.payload.map((comment, ind) => ({
                    comment: comment,
                    ui: {
                        repliesInputOpen: false,
                        repliesState: MoreButtonState.HIDDEN
                    }
                }))
            )
        },
        setInputContext: (state, action: PayloadAction<{parentCommentId: number | null, commentId: number | null}>) => {
            state.ui.replyContext = action.payload
        },
        openInput: (state, action: PayloadAction<{parentCommentId: number | null, commentId: number | null}>) => {
            state.ui.replyContext = action.payload
            state.ui.inputOpen = true
        },
        closeInput: (state, action) => {
            state.ui.inputOpen = false
        },
        toggleReplyInputOpen: (state, action: PayloadAction<{commentId: number}>) => {
            const {commentId} = action.payload

            const commentBlock = state.entities[commentId]
            
            commentBlock.ui.repliesInputOpen = !commentBlock.ui.repliesInputOpen
        },
        setReplyInputOpen: (state, action: PayloadAction<{commentId: number, open: boolean}>) => {
            const {commentId, open} = action.payload
            state.entities[commentId].ui.repliesInputOpen = open
        },
        setRepliesState: (state, action: PayloadAction<{commentId: number, repliesState: MoreButtonState}>) => {
            const {commentId, repliesState} = action.payload

            state.entities[commentId].ui.repliesState = repliesState
        }
    },
    extraReducers: (builder) => (builder
        .addCase(addReply.fulfilled, (state, action) => {
            const {comment} = action.payload

            const commentBlock = state.entities[comment.id]
            commentBlock.comment.data.replies_count += 1
            commentBlock.ui.repliesState = MoreButtonState.OPEN_PARTICULARLY
        })
        .addCase(voteComment.fulfilled, (state, action) => {
            const {commentId, vote} = action.payload

            const commentBlock = state.entities[commentId]
            const userVote = state.entities[commentId].comment.context!.viewer.vote

            if (vote == 1) {
                if (userVote == -1) {
                    commentBlock.comment.data.up_votes += 1
                    commentBlock.comment.data.down_votes -=1
                } else if (userVote == 1) {
                    commentBlock.comment.data.up_votes -= 1
                } else {
                    commentBlock.comment.data.up_votes += 1
                }
            } else {
                if (userVote == 1) {
                    commentBlock.comment.data.up_votes -= 1
                    commentBlock.comment.data.down_votes +=1
                } else if (userVote == -1) {
                    commentBlock.comment.data.down_votes -= 1
                } else {
                    commentBlock.comment.data.down_votes += 1
                }
            }

            if (userVote == vote) {
                commentBlock.comment.context!.viewer.vote = null
            } else {
                commentBlock.comment.context!.viewer.vote = vote
            }
        })
    )
})

export const { 
    addComment, 
    addCommentList, 
    setInputContext, 
    toggleReplyInputOpen, 
    setReplyInputOpen,
    openInput, 
    closeInput,
    setRepliesState
} = commentsSlice.actions

export default commentsSlice.reducer
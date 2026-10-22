import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, SubthreadBlock } from "./state";
import { Subthread, SubthreadContext } from "@/features/comment/types/subthread";
import { subthreadsAdapter } from "./adapters";
import { DiscussionComment } from "@/features/comment/types/discussion-comment.type";
import { commentsClientApi } from "@/features/comment/api/client.api";
import { addCommentList, addReply, voteComment } from "../comments/slice";


export const fetchDiscussion = createAsyncThunk(
    "subthreads/fetchDiscussionStatus",
    async (subthreadBlock: SubthreadBlock, thunkAPI) => {
        const response = await commentsClientApi.getDiscussion(subthreadBlock.rootCommentId, subthreadBlock.discussionCursor, 5)

        thunkAPI.dispatch(addCommentList(response.data.map((c, idx) => ({
            data: c,
            context: response.context[idx]
        }))))

        return {
            subthreadBlock: subthreadBlock,
            response: response
        }
    }
)

export const subthreadsSlice = createSlice({
    name: "subthreads",
    initialState,
    reducers: {
        addSubthread: (state, action: PayloadAction<{subthread: Subthread}>) => {
            const {subthread} = action.payload

            subthreadsAdapter.setOne(
                state,
                {
                    rootCommentId: subthread.root_comment.id,
                    discussionIds: subthread.discussion.map(d => d.id),
                    discussionHasMore: subthread.discussion_pagination.has_more,
                    discussionCursor: subthread.discussion_pagination.cursor 
                }
            )
        },
        addSubthreadsList: (state, action: PayloadAction<{subthreads: Subthread[]}>) => {
            const {subthreads} = action.payload

            for (let i = 0; i < subthreads.length; i++) {
                const subthread = subthreads[i]

                subthreadsAdapter.setOne(
                    state,
                    {
                        rootCommentId: subthread.root_comment.id,
                        discussionIds: subthread.discussion.map(d => d.id),
                        discussionHasMore: subthread.discussion_pagination.has_more,
                        discussionCursor: subthread.discussion_pagination.cursor   
                    }
                )
            }
        }
    },
    extraReducers: (builder) => (builder
        .addCase(addReply.fulfilled, (state, action) => {
            const {parentCommentId, comment, response} = action.payload

            if (parentCommentId == null) { // subthreads added
                subthreadsAdapter.setOne(state, {
                    rootCommentId: response.data.id,
                    discussionIds: [],
                    discussionHasMore: false,
                })
            } else if (comment.id in state.entities) {
                const stateBlock = state.entities[comment.id]

                stateBlock.discussionIds.unshift(response.data.id)
            } else {
                for (let sId of state.ids) {
                    const discussionIds = state.entities[sId].discussionIds

                    const parentCommentIdx = discussionIds.findIndex(dId => dId == comment.id)
                    if (parentCommentIdx != -1) {
                        state.entities[sId].discussionIds.splice(parentCommentIdx+1, 0, response.data.id)
                        break
                    }
                }
            }
        })
        .addCase(fetchDiscussion.fulfilled, (state, action) => {
            const {subthreadBlock, response} = action.payload

            const stateBlock = state.entities[subthreadBlock.rootCommentId]
            stateBlock.discussionCursor = response.pagination.cursor
            stateBlock.discussionHasMore = response.pagination.has_more

            for (let i of response.data) {
                if (stateBlock.discussionIds.findIndex(dID => dID == i.id) == -1)
                    stateBlock.discussionIds.push(i.id)
            }
        })
    )}
)

export const { addSubthread, addSubthreadsList } = subthreadsSlice.actions

export default subthreadsSlice.reducer
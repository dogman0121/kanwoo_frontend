import { createSlice, EntityAdapter, PayloadAction } from "@reduxjs/toolkit";
import { addComments, findIndexOrError, setComments, updatePagination } from "./utils";
import { makeThunks } from "./thunks";
import { CommentsBlock, CommentsState } from "./state";


export function makeSlice(
    sliceName: string, 
    adapter: EntityAdapter<CommentsBlock, string | number>,
    options: {
        type: "chapter" | "manga" | "post", 
    }
) {

    const { fetchCommentsPreview, fetchComments, sendComment } = makeThunks(sliceName, {type: options.type})

    const commentsSlice = createSlice({
        name: sliceName,
        initialState: adapter.getInitialState(),
        reducers: {
            addBlock: (
                state: CommentsState, 
                action: PayloadAction<number | string>
            ) => {

                adapter.setOne(state, {
                    entityId: action.payload,
                    commentsIds: [],
                    hasMore: true,
                    totalCount: 0,
                    limit: 10
                })

            },
        },
        extraReducers: (builder) => builder
            .addCase(fetchCommentsPreview.fulfilled, (state, action) => {
                const {entityId, response} = action.payload
                const pagination = response.pagination

                setComments(state, entityId, response.data)
                updatePagination(state, entityId, pagination.has_more, pagination.limit, pagination?.cursor)

                state.entities[entityId].totalCount = response.metadata.total_count
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                const {entityId, response} = action.payload

                const pagination = response.pagination

                addComments(
                    state, 
                    action.payload.entityId, 
                    action.payload.response.data,
                )
                updatePagination(state, entityId, pagination.has_more, pagination.limit, pagination?.cursor)
            })
            .addCase(sendComment.fulfilled, (state, action) => {
                const {entityId, response} = action.payload

                const blockIdx = findIndexOrError(entityId, state.ids)
                const blockId = state.ids[blockIdx]

                state.entities[blockId].commentsIds.unshift(response.data.id)
            })
    }
)
    return {
        slice: commentsSlice,
        thunks: {
            fetchComments,
            fetchCommentsPreview,
            sendComment
        },
    }
}
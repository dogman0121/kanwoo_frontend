import { commentsAdapter } from "./adapters";
import { RootState } from "./state";

export const {
    selectById: selectCommentBlockById
} = commentsAdapter.getSelectors((state: RootState) => state.comments.comments)


export const selectById = (state: RootState, id: number) => {
    const comment = selectCommentBlockById(state, id)

    return comment.comment
}

export const selectInputOpen = (state: RootState) => {
    return state.comments.comments.ui.inputOpen
}


export const selectReplyContext = (state: RootState) => {
    return state.comments.comments.ui.replyContext
}

export const selectRepliesState = (state: RootState, commentId: number) => {
    return state.comments.comments.entities[commentId].ui.repliesState
}
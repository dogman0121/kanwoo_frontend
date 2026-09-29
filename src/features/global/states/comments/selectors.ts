import { commentsAdapter } from "./adapters";
import { RootState } from "./state";

const {
    selectById: selectCommentBlockById
} = commentsAdapter.getSelectors((state: RootState) => state.global.comments)


export const selectById = (state: RootState, id: number) => {
    const comment = selectCommentBlockById(state, id)

    return comment.comment
}
import { makeEntityAdapter } from "@/lib/state/common/comments/adapter";
import { makeSelectors } from "@/lib/state/common/comments/selectors";
import { makeSlice } from "@/lib/state/common/comments/slice";
import { CommentsState } from "@/lib/state/common/comments/state";

export type RootState = {
    reader: {comments: CommentsState}
}


const adapter = makeEntityAdapter()

export const {
    selectCommentsBlockById,
    selectCommentsBlocks
} = makeSelectors(adapter, (state) => state.reader.comments)

const {
    slice,
    thunks
} = makeSlice(
    "reader/comments", 
    adapter,
    {type: "chapter"}
)

export const {
    fetchComments,
    fetchCommentsPreview,
    sendComment
} = thunks

export const {
    addBlock
} = slice.actions

export default slice.reducer
import { selectCommentBlockById, selectRepliesState } from "@/features/global/states/comments/comments/selectors"
import { selectThreadBlockById } from "@/features/global/states/comments/threads/selectors"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import CommentItem from "./CommentItem"
import CommentMoreButton, { MoreButtonState } from "./ui/CommentMoreButton"
import { Box } from "@mui/material"
import CommentReplies from "./ui/CommentReplies"
import SubthreadComment from "./SubthreadComment"
import { v4 } from "uuid"
import { fetchSubthreads } from "@/features/global/states/comments/threads/slice"
import { setRepliesState } from "@/features/global/states/comments/comments/slice"

export default function ThreadComment({
    threadId,
}: {
    threadId: number,
}){
    const dispatch = useAppDispatch()

    const threadBlock = useAppSelector(state => selectThreadBlockById(state, threadId))

    const commentBlock = useAppSelector(state => selectCommentBlockById(state, threadBlock.rootCommentId))
    

    const comment = commentBlock.comment
    const subthreadsIds = threadBlock.subthreadsIds
    const moreButtonState = commentBlock.ui.repliesState

    const handleOpenReplies = async () => {
        let hasMore = threadBlock.subthreadsHasMore 
        if (hasMore) {
            const res = await dispatch(fetchSubthreads(threadBlock)).unwrap()

            hasMore = res.response.pagination.has_more 
        }

        return dispatch(setRepliesState({
            commentId: comment.id, 
            repliesState: hasMore ? MoreButtonState.OPEN_PARTICULARLY: MoreButtonState.OPEN_FULL
        }))
    }

    const handleCloseReplies = async () => {
        dispatch(setRepliesState({
            commentId: threadId, 
            repliesState: MoreButtonState.HIDDEN
        }))
    }

    return (
        <Box id={comment.id.toString()}>
            <CommentItem
                commentId={threadId}
                depth={1}
                disableReplyTo
            />
            {moreButtonState != MoreButtonState.HIDDEN && (
                <CommentReplies depth={1}>
                    {subthreadsIds.map((subthreadID) => (
                        <SubthreadComment 
                            key={v4()}
                            subthreadId={subthreadID}
                            threadId={threadId}
                        />
                    ))}
                    
                </CommentReplies>
            )}
            {comment.replies_count > 0 && (
                <CommentMoreButton
                    depth={1} 
                    state={moreButtonState} 
                    repliesCount={comment.replies_count}
                    onHidden={handleCloseReplies}
                    onShow={handleOpenReplies}
                    onMore={handleOpenReplies}
                />
            )}
        </Box>
    )
}
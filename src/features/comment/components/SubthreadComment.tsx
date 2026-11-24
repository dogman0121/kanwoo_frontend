import { selectCommentBlockById } from "@/features/comment/states/comments/selectors"
import { selectSubthreadBlockById } from "@/features/comment/states/subthreads/selectors"
import { fetchDiscussion } from "@/features/comment/states/subthreads/slice"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { Box } from "@mui/material"
import CommentLeaveLine from "./ui/CommentLeaveLine"
import CommentItem from "./CommentItem"
import CommentReplies from "./ui/CommentReplies"
import CommentMoreButton, { MoreButtonState } from "./ui/CommentMoreButton"
import DiscussionComment from "./DiscussionComment"
import { v4 } from "uuid"

export default function SubthreadComment({
    subthreadId,
    threadId,
    disableReplyInput
}: {
    subthreadId: number,
    threadId: number,
    disableReplyInput?: boolean
}) {
    const dispatch = useAppDispatch()

    const subthreadBlock = useAppSelector(state => selectSubthreadBlockById(state, subthreadId))
    const commentBlock = useAppSelector(state => selectCommentBlockById(state, subthreadBlock.rootCommentId))

    const comment = commentBlock.comment
    const discussionIds = subthreadBlock.discussionIds

    const handleMore = () => {
        if (subthreadBlock.discussionHasMore)
            dispatch(fetchDiscussion(subthreadBlock))
    }

    return (
        <Box
            className="comment"
            sx={{
                mt: 2,
                position: "relative",

                display: "flex",
                flexDirection: "row"
            }}
        >
            <CommentLeaveLine depth={2} isLast={false}/>
            <Box
                sx={{
                    width: "100%",
                    ml: 3
                }}
            >
                <CommentItem 
                    commentId={subthreadBlock.rootCommentId}
                    parentId={threadId}
                    depth={2}
                    disableReplyTo
                    disableReplyInput={disableReplyInput}
                />
                {comment.data.replies_count > 0 && (
                    <CommentReplies depth={2}>
                        {discussionIds.map((dID, idx) => (
                            <DiscussionComment 
                                key={v4()}
                                commentId={dID}
                                subthreadId={subthreadId}
                                isLast={!subthreadBlock.discussionHasMore && idx == discussionIds.length - 1}
                                disableReplyInput={disableReplyInput}
                            />
                        ))}
                    </CommentReplies>
                )}
                {subthreadBlock.discussionHasMore && (
                    <CommentMoreButton 
                        depth={2} 
                        state={MoreButtonState.OPEN_PARTICULARLY}
                        onMore={handleMore}
                        repliesCount={comment.data.replies_count}
                    />
                )}
            </Box>
        </Box>
    )
}
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { Comment } from "../types"
import { selectCommentBlockById } from "@/features/comment/states/comments/selectors"
import { Box } from "@mui/material"
import CommentLeaveLine from "./ui/CommentLeaveLine"
import CommentInput from "./ui/CommentInput"
import CommentItem from "./CommentItem"

export default function DiscussionComment({
    commentId,
    subthreadId,
    isLast,
}: {
    commentId: number,
    subthreadId: number,
    isLast: boolean,
}) {
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
            <CommentLeaveLine depth={3} isLast={isLast}/>
            <Box
                sx={{
                    width: "100%",
                    ml: 3
                }}
            >
                <CommentItem 
                    commentId={commentId}
                    parentId={subthreadId}
                    depth={3}
                />
            </Box>
        </Box>
    )
}
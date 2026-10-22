import { Box } from "@mui/material"

import CommentAvatar from "./ui/CommentAvatar"
import CommentActions from "./ui/CommentActions"
import CommentTreeLine from "./ui/CommentRootLine"
import { selectCommentBlockById } from "@/features/comment/states/comments/selectors"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import CommentInput from "./ui/CommentInput"
import { addReply as addReply, setInputContext, setReplyInputOpen, toggleReplyInputOpen, voteComment } from "@/features/comment/states/comments/slice"
import { selectDeviceType, setAuthSnackbarOpen } from "@/features/global/states/app/slice"
import { selectAuthProfile } from "@/features/global/states/auth-profile"
import CommentBody from "./ui/CommentBody"
import CommentOptionsButton from "./ui/CommentOptionsButton"


function ReplyInput({
    onReply,
    onClose
}: {
    onClose?: () => void,
    onReply?: (text: string) => void
}) {
    const deviceType = useAppSelector(selectDeviceType)
    
    if (deviceType == "mobile") {
        return (
            <></>
        )
    }

    return (
        <CommentInput 
            size="medium"
            defaultOpen
            onSend={onReply}
            onClose={onClose}
            sx={{
                mt: 1
            }}
        />
    )
}

export interface CommentItemProps {
    commentId: number,
    depth: number,
    disableReplyTo?: boolean,
    parentId?: number | null
}

export default function CommentItem({
    commentId,
    depth,
    disableReplyTo = false,
    parentId = null
}: CommentItemProps) {
    const dispatch = useAppDispatch()

    const authProfile = useAppSelector(selectAuthProfile)

    const commentBlock = useAppSelector(state => selectCommentBlockById(state, commentId))
    const comment = commentBlock.comment
    const commentContext = commentBlock.comment.context

    const hasReplies = comment.data.replies_count > 0

    const handleVote = (vote: number) => {
        if (!authProfile) {
            dispatch(setAuthSnackbarOpen(true))
            return
        }
        dispatch(voteComment({
            commentId: commentId,
            vote: vote
        }))
    }

    const handleReply = (text: string) => {
        if (!authProfile) {
            dispatch(setAuthSnackbarOpen(true))
            return
        }

        dispatch(addReply({
            parentCommentId: parentId,
            comment: comment.data,
            text: text
        }))
        dispatch(setReplyInputOpen({commentId: comment.data.id, open: false}))
    }

    return (
        <Box
            sx={{
                position: "relative",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,

                }}
            >
                <Box>
                    <CommentAvatar depth={depth} src={comment.data.creator.avatar}/>
                    {hasReplies && (
                        <CommentTreeLine depth={depth}/>
                    )}
                </Box>
                <Box
                    sx={{
                        width: "100%"
                    }}
                >
                    <CommentBody 
                        text={comment.data.text}
                        creator={comment.data.creator}
                        created_at={comment.data.created_at}
                        replyTo={comment.data.reply_to}
                        disableReplyTo={disableReplyTo}
                    />
                    <CommentActions 
                        onClickReplyButton={() => {
                            dispatch(setInputContext({parentCommentId: parentId, commentId: comment.data.id}))
                            dispatch(toggleReplyInputOpen({commentId: commentId}))
                        }}
                        onVoteDown={() => handleVote(-1)}
                        onVoteUp={() => {handleVote(1)}}
                        userVote={comment.context!.viewer.vote}
                        votes={comment.data.up_votes}
                    />
                    {commentBlock.ui.repliesInputOpen && (
                        <ReplyInput 
                            onClose={() => dispatch(setReplyInputOpen({commentId: commentId, open: false}))}
                            onReply={handleReply}
                        />
                    )}
                </Box>
            </Box>
            <CommentOptionsButton />
        </Box>
    )
}





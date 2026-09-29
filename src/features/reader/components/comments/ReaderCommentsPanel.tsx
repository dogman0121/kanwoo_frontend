"use client"

import CommentsPanel from "@/features/comment/components/CommentsPanel";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { fetchComments, selectCommentsBlockById, sendComment } from "../../states/comments/slice";
import { selectCommentsPanelOpen, setCommentsPanelOpen } from "../../states/reader.slice";
import { selectCurrentChapter } from "../../states/reader/selectors";
import { addReply } from "@/features/global/states/comments/slice";

export default function ReaderCommentsPanel() {
    const dispatch = useAppDispatch()

    const currChapter = useAppSelector(selectCurrentChapter)
    const commentsPanelOpen = useAppSelector(selectCommentsPanelOpen)

    const commentsBlock = useAppSelector(state => {
        if (!currChapter) return null

        return selectCommentsBlockById(state, currChapter.id)
    })

    const handleCloseComments = () => {
        dispatch(setCommentsPanelOpen(false))
    } 

    const handleLoadComments = () => {
        if (commentsBlock)
            dispatch(fetchComments(commentsBlock))
    }

    const handleSendComment = (text: string, parentID?: number) => {
        if (parentID) {
            dispatch(addReply({parentId: parentID, text}))
        } else {
            if (commentsBlock) {
                dispatch(sendComment({commentsBlock: commentsBlock, text: text}))
            }
        }
    }

    return (
        <CommentsPanel 
            open={commentsPanelOpen}
            onClose={handleCloseComments}
            commentsIds={commentsBlock?.commentsIds || []}
            hasMore={commentsBlock?.hasMore || false}
            onLoad={handleLoadComments}
            onSendComment={handleSendComment}
        />
    )
}
import CommentsPanel from "@/features/comment/components/CommentsPanel";
import PreviewComment from "@/features/comment/components/PreviewComment";
import { addReply } from "@/features/global/states/comments/slice";
import { fetchComments, fetchCommentsPreview, addBlock, selectCommentsBlockById, sendComment } from "@/features/manga/states/manga-page/comments/slice";
import { selectManga } from "@/features/manga/states/manga-page/page/slice";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function CommentsPreview() {
    const dispatch = useAppDispatch()

    const manga = useAppSelector(selectManga)

    const [commentsPanelOpen, setCommentsPanelOpen] = useState(false)

    const commentsBlock = useAppSelector(state => {
        if (!manga) return null

        return selectCommentsBlockById(state, manga.slug)
    })

    const handleLoadComments = () => {
        if (commentsBlock)
            dispatch(fetchComments(commentsBlock))
    }

    const handleSendComment = (text: string, parentId?: number) => {
        if (parentId) {
            dispatch(addReply({parentId: parentId, text: text}))
        } else {
            if (commentsBlock)
                dispatch(sendComment({commentsBlock: commentsBlock, text: text}))
        }
    }

    useEffect(() => {
        if (manga && !commentsBlock) {
            dispatch(addBlock(manga.slug))
            dispatch(fetchCommentsPreview(manga.slug))
        }
    }, [manga, commentsBlock])

    if (!commentsBlock) return;

    return (
        <>
            <Paper
                onClick={() => setCommentsPanelOpen(true)}
                sx={{
                    px: 2,
                    pt: 3,
                    pb: 2,
                    borderRadius: 2
                }}
            >
                <Typography variant="h3">
                    {commentsBlock.totalCount} комментариев
                </Typography>
                {commentsBlock.commentsIds.length > 0 && (
                    <Box
                        sx={{
                            mt: 3
                        }}
                    >
                        <PreviewComment 
                            commentId={commentsBlock.commentsIds[0]}
                        />
                    </Box>
                )}
            </Paper>
            <CommentsPanel
                open={commentsPanelOpen} 
                commentsIds={commentsBlock.commentsIds}
                hasMore={commentsBlock.hasMore}
                onClose={() => setCommentsPanelOpen(false)}
                onLoad={handleLoadComments}
                onSendComment={handleSendComment}
            />
        </>
    )
}
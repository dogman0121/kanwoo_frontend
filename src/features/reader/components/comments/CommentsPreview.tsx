"use client"

import { Avatar, Box, Button, Paper, Skeleton, SxProps, Typography } from "@mui/material";
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import CommentInput from "@/features/comment/components/CommentInput";
import CommentSkeletonList from "./skeleton/CommentSkeletonList";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import CommentsList from "./CommentsList";
import { MouseEvent, Suspense, useEffect, useRef, useState } from "react";
import { Chapter } from "@/types/chapter";
import PreviewComment from "@/features/comment/components/PreviewComment";
import { setCommentsPanelOpen } from "../../states/reader.slice";
import { addBlock, fetchComments, fetchCommentsPreview, selectCommentsBlockById } from "../../states/comments/slice";

export interface CommentsPreviewProps {
    children?: React.ReactNode,
    chapter: Chapter,
    sx?: SxProps
}

export default function CommentsPreview({
    chapter,
    sx
}: CommentsPreviewProps) {
    const dispatch = useAppDispatch()

    const containerRef = useRef<HTMLDivElement>(null)
    const commentsButtonRef = useRef<HTMLButtonElement>(null)
    const sendButtonRef = useRef<HTMLButtonElement>(null)
    const commentsBlock = useAppSelector(state => selectCommentsBlockById(state, chapter.id))

    const handleShowComments = () => {    
        console.log(123)    
        dispatch(setCommentsPanelOpen(true))
    }

    useEffect(() => {
        if (!commentsBlock) {
            dispatch(addBlock(chapter.id))
            return
        }

        if (commentsBlock.commentsIds.length == 0 && commentsBlock.hasMore)
            dispatch(fetchCommentsPreview(chapter.id))

        return () => {}
    }, [commentsBlock])

    useEffect(() => {
        const container = containerRef.current;
        const commentsButton = commentsButtonRef.current
        const sendButton = sendButtonRef.current
        if (!container || !commentsButton || !sendButton) return;

        const stop = (e: Event) => {
            e.stopPropagation();
        };

        container.addEventListener("click", stop);
        container.addEventListener("pointerdown", stop)
        container.addEventListener("pointerup", stop)
        commentsButton.addEventListener("click", handleShowComments);
        sendButton.addEventListener("click", stop);

        return () => {
            container.removeEventListener("click", stop);
            commentsButton.addEventListener("click", handleShowComments);
            sendButton.addEventListener("click", stop);
        };
    }, [containerRef.current, commentsButtonRef.current, sendButtonRef.current]);

    if (!commentsBlock) return

    return (
        <div ref={containerRef}>
            <Paper
                elevation={1}
                onClick={(event) => {event.stopPropagation()}}
                sx={{
                    width: "100%",
                    borderRadius: 2,

                    mx: "auto",
                    p: 2,

                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    ...sx
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Typography 
                        fontWeight={600} 
                        fontSize={"18px"}
                    >
                        {commentsBlock?.totalCount != undefined ? 
                            commentsBlock.totalCount : 
                            "-"
                        } комментариев
                    </Typography>
                    <Button 
                        size="small" 
                        variant="contained" 
                        color="secondary" 
                        endIcon={<EastRoundedIcon />}
                        ref={commentsButtonRef}
                        sx={{
                            "&:hover": {
                                bgcolor: "secondary.main"
                            }
                        }}
                    >
                        показать ещё
                    </Button>
                </Box>
                <Paper
                    elevation={2}
                    sx={{
                        borderRadius: 1,

                        px: 3,
                        py: 2
                    }}
                >
                    <CommentsList>
                        {commentsBlock?.commentsIds.slice(0, 3).map(
                            commentId => (
                                <PreviewComment
                                    commentId={commentId} 
                                    key={`comment_preview_comment_${commentId}`}
                                />
                            )
                        )}
                    </CommentsList>
                </Paper>
                <CommentInput 
                    size="small"
                    slotProps={{
                        sendButton: {
                            ref: sendButtonRef
                        }
                    }}
                />
            </Paper>
        </div>
    )
}
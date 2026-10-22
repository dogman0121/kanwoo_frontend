"use client"

import CommentItem from "@/features/comment/components/CommentItem"
import CommentInput from "@/features/comment/components/ui/CommentInput"
import { addBlock, fetchComments, selectCommentsBlockById, sendComment } from "@/features/manga/states/manga-page/comments/slice"
import { selectManga } from "@/features/manga/states/manga-page/page/slice"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { Avatar, Box, Button, Icon, IconButton, Tooltip, Typography } from "@mui/material"
import { useEffect } from "react"
import CommentsList from "@/features/comment/components/CommentsList"
import ThreadComment from "@/features/comment/components/ThreadComment"

export default function CommentsSection() {
    const dispatch = useAppDispatch()

    const manga = useAppSelector(selectManga)

    const commentsBlock = useAppSelector(state => {
        if (!manga) return null

        return selectCommentsBlockById(state, manga.data.slug)
    })

    const handleSend = (text: string) => {
        if (!commentsBlock) 
            return

        dispatch(sendComment({commentsBlock: commentsBlock, text: text}))
    }   

    useEffect(() => {
        if (!manga) return

        dispatch(addBlock(manga.data.slug))
    }, [])

    if (!commentsBlock)
        return 

    return (
        <Box>
            <CommentInput size="medium" onSend={handleSend}/>
            <CommentsList
                commentsLength={commentsBlock.commentsIds.length}
                hasMore={commentsBlock.hasMore}
                onNext={() => dispatch(fetchComments(commentsBlock))}
                sx={{
                    py: 4
                }}
            >
                {commentsBlock.commentsIds.map(cID => (
                    <ThreadComment
                        key={`manga_page_comment_${cID}`} 
                        threadId={cID}
                    />
                ))}
            </CommentsList> 
        </Box>
    )
}
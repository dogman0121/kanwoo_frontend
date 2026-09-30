"use client"

import CommentItem from "@/features/comment/components/Comment"
import CommentInput from "@/features/comment/components/CommentInput"
import CommentsList from "@/features/comment/components/CommentsList"
import { addBlock, fetchComments, selectCommentsBlockById } from "@/features/manga/states/manga-page/comments/slice"
import { selectManga } from "@/features/manga/states/manga-page/page/slice"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { Box } from "@mui/material"
import { useEffect } from "react"

export default function CommentsSection() {
    const dispatch = useAppDispatch()

    const manga = useAppSelector(selectManga)

    useEffect(() => {
        if (!manga) return

        dispatch(addBlock(manga.slug))
    }, [])

    const commentsBlock = useAppSelector(state => {
        if (!manga) return null

        return selectCommentsBlockById(state, manga.slug)
    })

    if (!commentsBlock)
        return 

    return (
        <Box>
            <CommentInput size="medium"/>
            <CommentsList
                commentsLength={commentsBlock.commentsIds.length}
                hasMore={commentsBlock.hasMore}
                onNext={() => dispatch(fetchComments(commentsBlock))}
                sx={{
                    py: 4
                }}
            >
                {commentsBlock.commentsIds.map(cID => (
                    <CommentItem
                        key={`manga_page_comment_${cID}`} 
                        commentId={cID}
                    />
                ))}
            </CommentsList> 
        </Box>
    )
}
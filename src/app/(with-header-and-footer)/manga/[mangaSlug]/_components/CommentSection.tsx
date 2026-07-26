"use client"

import CommentInput from "@/features/comments/components/CommentInput";
import CommentsList from "@/features/comments/components/CommentsList";
import NoComments from "@/features/comments/components/NoComments";
import { useCursorPagination } from "@/features/pagination/hooks/usePagePagination";
import { clientFetch } from "@/lib/fetch/clientFetch";
import { useAppSelector } from "@/lib/state/hooks";
import Comment from "@/types/comment/comment";
import { Box, Typography } from "@mui/material";

export default function CommentsSection() {

    const manga = useAppSelector(state => state.mangaPage.manga)

    const {
        hasMore, 
        perPage, 
        lastId, 
        setLastId, 
        setTotalCount, 
        results, 
        setResults
    } = useCursorPagination<Comment>();

    const handleAddComment = async (commentText: string) => {
        if (!manga) return;

        const response = await clientFetch.post<Comment>("/comments", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                manga: manga.id,
                text: commentText
            })
        })

        setResults([response.data, ...results])
    }

    const handleLoadComments = async () => {
        if (!manga) return;

        const response = await clientFetch.get<Comment[]>(
            `/manga/${manga.slug}/comments?last_id=${lastId}&limit=${perPage}`
        )

        if (response.pagination && "last_id" in response.pagination){
            setLastId(response.pagination.last_id)
            setTotalCount(response.pagination.total_count)
        }
        setResults([...results, ...response.data])
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: 3
            }}
        >
            <CommentInput onSend={handleAddComment}/>
            {!hasMore && results.length == 0 ?
                <NoComments />
                :
                <CommentsList 
                    comments={results}
                    hasMore={hasMore}
                    onNext={handleLoadComments}
                />
            }
        </Box>
    )
}
import { Box, IconButton, Modal, ModalProps, Typography } from "@mui/material";
import Header from "./Header";
import WestRoundedIcon from "@mui/icons-material/WestRounded"
import PageTitle from "./PageTitle";
import CommentInput from "@/features/comments/components/CommentInput";
import CommentsList from "@/features/comments/components/CommentsList";
import { useState } from "react";
import { useCursorPagination } from "@/features/pagination/hooks/usePagePagination";
import { clientFetch } from "@/lib/fetch/clientFetch";
import { useAppSelector } from "@/lib/state/hooks";
import Comment from "@/types/comment/comment";
import NoComments from "@/features/comments/components/NoComments";


export default function CommentsModal({onClose, ...props}: Omit<ModalProps, "children">) {
    const chapter = useAppSelector(state => state.chapterPage.currentChapter)

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
        if (!chapter) return;

        const response = await clientFetch.post<Comment>("/comments", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chapter: chapter.id,
                text: commentText
            })
        })

        setResults([response.data, ...results])
    }

    const handleLoadComments = async () => {
        if (!chapter) return;

        const response = await clientFetch.get<Comment[]>(
            `/chapters/${chapter.id}/comments?last_id=${lastId}&limit=${perPage}`
        )

        if (response.pagination && "last_id" in response.pagination){
            setLastId(response.pagination.last_id)
            setTotalCount(response.pagination.total_count)
        }
        setResults([...results, ...response.data])
    }

    return (
        <Modal
            sx={{
                overflowY: "auto"
            }}
            onClose={onClose}
            {...props}
        >
            <Box
                sx={{
                    minHeight: "100%",

                    bgcolor: "background.paper",

                    zIndex: 100
                }}
            >
                <Header
                    sx={{
                        position: "sticky",
                        bgcolor: "background.paper"
                    }}
                >
                    <IconButton
                        disableRipple
                        onClick={() => onClose?.({}, "backdropClick")}
                    >
                        <WestRoundedIcon />
                    </IconButton>
                    <PageTitle
                    >
                        Комментарии
                    </PageTitle>
                    <Box 
                        sx={{
                            width: "40px",
                            height: "40px"
                        }}
                    />
                </Header>
                <Box
                    sx={{
                        pt: 3,
                        pb: 2,
                        px: 1,
                        
                        maxWidth: "800px",
                        mx: "auto",
                        display: "flex",
                        flexDirection: "column",
                        rowGap: 2
                    }}
                >
                    <CommentInput 
                        onSend={handleAddComment}
                    />
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
            </Box>
        </Modal>
    )
}
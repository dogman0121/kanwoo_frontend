import Comment from "@/types/comment/comment"
import { Box, BoxProps, CircularProgress, Typography } from "@mui/material"
import InfiniteScroll from "react-infinite-scroll-component"
import CommentItem from "./Comment"
import theme from "@/theme"

export interface CommentsListProps {
    comments?: Comment[],
    hasMore?: boolean
    onNext?: () => void
}

export default function CommentsList({
    comments,
    hasMore,
    onNext,
    sx,
    ...props
}: CommentsListProps & BoxProps) {
    
    return (
        <InfiniteScroll
            dataLength={comments?.length ?? 0}
            hasMore={hasMore || false}
            next={onNext ?? (() => {})}
            loader={
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",                        
                        alignItems: "center"
                    }}
                >
                    <CircularProgress />
                </Box>
            }
        >        
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: theme.spacing(3),
                    ...sx
                }}
                {...props}
            >
                {comments?.map(comment => (
                    <CommentItem comment={comment} key={`comment_list_${comment.id}`}/>
                ))}
            </Box>   
        </InfiniteScroll>
    )
}
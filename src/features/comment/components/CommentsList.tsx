import { Box, BoxProps, CircularProgress, Typography } from "@mui/material"
import InfiniteScroll from "react-infinite-scroll-component"
import theme from "@/constants/themes/main.theme"
import { Children } from "react"

export interface CommentsListProps {
    hasMore?: boolean,
    commentsLength: number,
    onNext?: () => void
}

export default function CommentsList({
    hasMore,
    onNext,
    sx,
    commentsLength,
    children,
    ...props
}: CommentsListProps & BoxProps) {
    
    return (
        <InfiniteScroll
            dataLength={commentsLength}
            hasMore={hasMore || false}
            next={onNext ?? (() => {})}
            style={{
                overflowY: "hidden",
            }}
            loader={
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",                        
                        alignItems: "center",
                        py: 2
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
                {Children.map(children, c => c)}
            </Box>   
        </InfiniteScroll>
    )
}
import { Box, BoxProps, CircularProgress, Typography } from "@mui/material"
import InfiniteScroll from "react-infinite-scroll-component"
import theme from "@/constants/themes/main.theme"
import { Children } from "react"

export interface CommentsListProps {
    hasMore?: boolean,
    commentsLength: number,
    onNext?: () => void
}

function NoComments() {
    return (
        <Box
            sx={{
                py: 4
            }}
        >
            <Typography 
                color="textSecondary"
                component="p"
                sx={{
                    textAlign: "center"
                }}
            >
                Нет комментариев
            </Typography>
        </Box>
    )
}

export default function CommentsList({
    hasMore,
    onNext,
    sx,
    commentsLength,
    children,
    ...props
}: CommentsListProps & BoxProps) {

    if (commentsLength == 0 && !hasMore)
        return <NoComments />
    
    return (
        <InfiniteScroll
            dataLength={commentsLength}
            hasMore={hasMore || false}
            next={onNext ?? (() => {})}
            style={{
                overflowY: "visible",
                overflowX: "clip"
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
"use client"

import { Children, useContext } from "react";
import SearchContext from "../../context/SearchContext";
import { Box, BoxProps, CircularProgress, List, Typography} from "@mui/material";
import ScrollableBox from "@/components/ScrollableBox";
import InfiniteScroll from "react-infinite-scroll-component";


function SearchList({ sx, children, ...props }: BoxProps) {
    const {
        query, 
        results, 
        onNext, 
        hasMore,
        isLoading,
        processEmptyQuery
    } = useContext(SearchContext);

    if (!processEmptyQuery && query.length == 0) {
        return (
            <Box
                sx={{
                    width: "100%",
                    p: "50px 0"
                }}
            >
                <Typography
                    color="textSecondary"
                    sx={{
                        textAlign: "center"
                    }}
                >
                    Введите запрос для начала поиска.
                </Typography>
            </Box>
        )
    }

    if (!hasMore && results.length == 0) 
        return (
            <Box
                sx={{
                    width: "100%",
                    p: "50px 0"
                }}
            >
                <Typography 
                    color="textSecondary"
                    sx={{
                        textAlign: "center"
                    }}
                >
                    По запросу {query} ничего не найдено.
                </Typography>
            </Box>
        )
    
    return (
        <InfiniteScroll
            dataLength={results.length}
            hasMore={!isLoading && hasMore}
            next={onNext}
            loader={
                <Box
                    sx={{
                        py: 10,
                        display: 'flex',
                        justifyContent: "center"
                    }}
                >
                    <CircularProgress />
                </Box>
            }
            
        >
            <List>
                <ScrollableBox
                    sx={{
                        overflowY: "auto",
                        ...sx
                    }}
                    {...props}
                >
                    {Children.map(children, (child) => child)}
                </ScrollableBox>
            </List>
        </InfiniteScroll>
    )
}

export default SearchList;
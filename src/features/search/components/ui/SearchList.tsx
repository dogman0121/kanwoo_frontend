"use client"

import React, { Children, useContext, useEffect, useRef } from "react";
import SearchContext from "../../context/SearchContext";
import { Box, BoxProps, CircularProgress, List, SxProps, Typography} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

export interface SearchList {
    sx?: SxProps,
    infinity?: boolean,
    children?: React.ReactNode
}

function SearchList({ 
    sx, 
    children,
    infinity = false
}: SearchList) {
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
            hasMore={infinity && !isLoading && hasMore}
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
            <Box
                sx={{
                    ...sx
                }}
            >
                {Children.map(children, (child) => child)}
            </Box>
        </InfiniteScroll>
    )
}

export default SearchList;
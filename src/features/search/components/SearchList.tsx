"use client"

import { Children, useContext } from "react";
import SearchContext from "../context/SearchContext";
import { Box, BoxProps, CircularProgress} from "@mui/material";
import ScrollableBox from "@/components/ScrollableBox";
import InfiniteScroll from "react-infinite-scroll-component";


function SearchList({ sx, children, ...props }: BoxProps) {
    const {
        query, 
        results, 
        onNext, 
        section, 
        filters, 
        hasMore,
        emptyQuery
    } = useContext(SearchContext);

    if (!emptyQuery && query.length == 0) {
        return (
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: "50px 0"
                }}
            >
               Введите запрос для начала поиска.
            </Box>
        )
    }

    if (!hasMore && results.length == 0) 
        return (
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: "50px 0"
                }}
            >
                По запросу {query} ничего не найдено.
            </Box>
        )


    return (
        <InfiniteScroll
            dataLength={results.length}
            hasMore={hasMore}
            next={() => onNext(query, section, filters)}
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
            <ScrollableBox
                sx={{
                    overflowY: "auto",
                    ...sx
                }}
                {...props}
            >
                {Children.map(children, (child) => child)}
            </ScrollableBox>
        </InfiniteScroll>
    )
}

export default SearchList;
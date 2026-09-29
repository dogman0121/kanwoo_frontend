"use client"

import { loadHistory, selectCursor, selectHasMore, selectDates, selectDateHistory } from "@/features/progress/states/auth-profile-history-page/slice"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { Box, CircularProgress, Divider, Typography } from "@mui/material"
import ProgressItem from "./ProgressItem"
import { ReadingProgress } from "@/types/reading-progress"
import InfiniteScroll from "react-infinite-scroll-component"

const MONTH_NAMES: Record<number, string> = {
    0: "янв",
    1: "фев",
    2: "мар",
    3: "апр",
    4: "май",
    5: "июн",
    6: "июл",
    7: "авг",
    8: "сен",
    9: "окт",
    10: "ноя",
    11: "дек"
}

function HistoryDateList({
    date
}: {
    date: string
}) {
    const dispatch = useAppDispatch()

    const progresses = useAppSelector(state => selectDateHistory(state, date))

    const compileDateIntoString = (dateString: string) => {
        const date = new Date(dateString)
        const currDate = new Date();

        const isToday = (date.getFullYear() === currDate.getFullYear() &&
            date.getMonth() === currDate.getMonth() &&
            date.getDate() === currDate.getDate()
        )

        const isYesterday = (currDate.getFullYear() === date.getFullYear()&&
            currDate.getMonth() === date.getMonth() &&
            currDate.getDate() - date.getDate() === 0 
        )

        if (isToday)
            return `Сегодня, ${currDate.getDate()} ${MONTH_NAMES[currDate.getMonth()]}. ${currDate.getFullYear()} г.`
        else if (isYesterday) 
            return `Вчера, ${date.getDate()} ${MONTH_NAMES[date.getMonth()]}. ${date.getFullYear()} г.`
        return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]}. ${date.getFullYear()} г.`
    }

    return (
        <Box>
            <Typography
                variant="h3"
                sx={{
                    my: 4
                }}
            >
                {compileDateIntoString(date)}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}
            >
                {progresses.map(prog => (
                    <ProgressItem 
                        key={`history_page_progress_${prog.progress.id}`}
                        progress={prog.progress}
                        progressContext={prog.progressContext}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default function HistoryList() {
    const dispatch = useAppDispatch()

    const dates = useAppSelector(selectDates)

    const hasMore = useAppSelector(selectHasMore)
    const cursor = useAppSelector(selectCursor)


    if (dates.length == 0)
        return <Typography color="textSecondary" textAlign={"center"} py={4}>У вас нет истории чтения.</Typography>


    return (
        <InfiniteScroll
            dataLength={history.length}
            hasMore={hasMore}
            next={() => dispatch(loadHistory(cursor))}
            loader={<CircularProgress />}
            style={{
                overflow: "hidden"
            }}
        >
            <Box
                sx={{
                    overflow: "hidden",
                    pb: 4
                }}
            >
                {dates.map(date => (
                    <HistoryDateList 
                        key={`history_page_date_${date}`}
                        date={date}
                    />
                ))}
            </Box>
        </InfiniteScroll>
    )
}
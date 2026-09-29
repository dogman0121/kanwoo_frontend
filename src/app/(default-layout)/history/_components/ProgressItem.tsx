"use client"

import Poster from "@/components/poster/Poster";
import { Box, Checkbox, IconButton, Paper, Typography, useTheme } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"
import { ReadingProgress, ReadingProgressContext } from "@/types/reading-progress";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { selectIsAllSelected, selectIsProgressSelected, setProgressSelected } from "@/features/progress/states/auth-profile-history-page/slice";

export default function ProgressItem({
    progress,
    progressContext
}: {
    progress: ReadingProgress,
    progressContext: ReadingProgressContext

}) {
    const dispatch = useAppDispatch()

    const allSelected = useAppSelector(selectIsAllSelected)
    const optionIsSelected = useAppSelector(
        state => selectIsProgressSelected(state, progress.id)
    )
    const theme = useTheme()

    const handleDelete = () => {

    }

    return (
        <Paper
            sx={{
                pt: 2,
                pr: 5,
                pb: 2,
                pl: 3,
                borderRadius: 2,

                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: theme.spacing(5)
                }}
            >
                <Poster 
                    src={progressContext.manga.poster.medium}
                    width={"64px"}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >
                    <Typography fontWeight={600}>{progressContext.manga.name}</Typography>
                    <Typography variant="caption">Глава {progressContext.chapter.chapter}</Typography>
                </Box>
            </Box>
            <Checkbox 
                checked={allSelected || optionIsSelected}
                onChange={(_event, checked) => {
                    console.log(checked, optionIsSelected)
                    dispatch(setProgressSelected({progressID: progress.id, selected: checked}))
                }}
            />
        </Paper>
    )
}
"use client"

import Poster from "@/components/Poster";
import ProfileReadingProgress from "@/types/profile/profileReadingProgress";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"

export default function DesktopReadingProgress({
    progress,
    onDelete
}: {
    progress: ProfileReadingProgress,
    onDelete: () => void

}) {
    const theme = useTheme()

    return (
        <Box
            sx={{
                mt: "10px",
                bgcolor: "background.paper",
                p: "12px 25px 12px 15px",
                borderRadius: "12px",

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
                    src={progress.manga.poster.medium}
                    width={"75px"}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >
                    <Typography fontWeight={600}>{progress.manga.name}</Typography>
                    <Typography variant="caption">Глава {progress.chapter.chapter}</Typography>
                </Box>
            </Box>
            <IconButton
                onClick={onDelete}
            >
                <DeleteRoundedIcon />
            </IconButton>
        </Box>
    )
}
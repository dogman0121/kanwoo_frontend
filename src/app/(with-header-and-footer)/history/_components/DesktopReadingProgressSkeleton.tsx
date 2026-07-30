"use client"

import Poster from "@/components/Poster";
import ProfileReadingProgress from "@/types/profile/profileReadingProgress";
import { Box, IconButton, Paper, Skeleton, Typography, useTheme } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"
import PosterSkeleton from "@/components/PosterSkeleton";

export default function DesktopReadingProgressSkeleton() {
    const theme = useTheme()

    return (
        <Paper
            sx={{
                mt: "10px",
                p: "12px 25px 12px 15px",
                boxShadow: "none",  
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
                <PosterSkeleton
                    width={"75px"} 
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >
                    <Skeleton variant="text" width={"200px"}/>
                    <Skeleton variant="text" width={"100px"}/>
                </Box>
            </Box>
        </Paper>
    )
}
import Poster from "@/components/Poster";
import theme from "@/theme";
import ReadingProgress from "@/types/manga/readingProgress";
import { Box, IconButton, LinearProgress, Link, Paper, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import { useState } from "react";
import { ROUTES } from "@/routes";

export default function ReadingProgressItem({
    readingProgress,
    onDelete
}: {
    readingProgress: ReadingProgress,
    onDelete: (progressId: number) => void
}) {
    const [removeIconVisible, setRemoveIconVisible] = useState(false);


    return (
        <Link
            href={ROUTES.CHAPTER(readingProgress.chapter.id)}
            sx={{
                "&:hover": {
                    textDecoration: "none"
                }
            }}
        >
            <Paper
                onMouseOver={() => setRemoveIconVisible(true)}
                onMouseOut={() => setRemoveIconVisible(false)}
                sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",

                    p: 2,
                    pr: 8,
                    borderRadius: "12px"
                }}
            >
                <Poster 
                    src={readingProgress.manga.poster.small}
                    width="70px"
                />
                <Box
                    sx={{
                        ml: 3,
                        py: 2,
                        width: "100%",

                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}
                >
                    <Typography
                        sx={{
                            lineClamp: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {readingProgress.manga.name}
                    </Typography>
                    <Box>
                        <Typography variant="caption">Глава {readingProgress.chapter.chapter} из {readingProgress.chapters_count}</Typography>
                        <LinearProgress 
                            variant="determinate"
                            value={(readingProgress.chapter.chapter / readingProgress.chapters_count) * 100} 
                            sx={{
                                width: "100%",
                                height: "8px",
                                mt: 1,
                                borderRadius: "10px",
                                backgroundColor: theme.vars?.palette.secondary.main
                            }}
                        />
                    </Box>
                </Box>
                {removeIconVisible && (
                    <IconButton
                        onClick={(event) => {
                            event.preventDefault()
                            onDelete(readingProgress.id)
                        }}
                        sx={{
                            position: "absolute",
                            right: "5px",
                            top: "5px"
                        }}
                    >
                        <CloseRoundedIcon 
                            sx={{
                                width: "20px",
                                height: "20px"
                            }}
                        />
                    </IconButton>
                )}
            </Paper>
        </Link>
        
    )
}
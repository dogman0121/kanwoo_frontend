import { useAppSelector } from "@/lib/state/hooks"
import { useState } from "react";
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/mousewheel"
import "swiper/css/navigation"
import "swiper/css/free-mode"
import { ReadingProgress, ReadingProgressContext } from "@/types/reading-progress";
import Link from "next/link";
import { routes, toHref } from "@/constants/routes/main.routes";
import { Box, IconButton, LinearProgress, Paper, Typography, useTheme } from "@mui/material";
import Poster from "@/components/poster/Poster";
import WrappedText from "@/components/WrapperTypography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import { selectDeviceType } from "@/features/global/states/app/slice";
import { HomeProgresses } from "@/features/home/types/hero";


export default function ReadingProgressItem({
    progress,
    progressContext,
    onDelete
}: {
    progress: ReadingProgress,
    progressContext: ReadingProgressContext
    onDelete?: (progressId: number) => void
}) {
    const theme = useTheme()

    const deviceType = useAppSelector(selectDeviceType)

    const [removeIconVisible, setRemoveIconVisible] = useState(deviceType == "mobile");

    return (
        <Link
            href={toHref(routes.chapters.item, {id: progressContext.chapter.id.toString()})}
        >
            <Paper
                onMouseOver={() => setRemoveIconVisible(true)}
                onMouseOut={() => setRemoveIconVisible(false)}
                sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    boxShadow: "none",

                    p: 2,
                    pr: 8,
                    borderRadius: "12px"
                }}
            >
                <Poster 
                    src={progressContext.manga.poster.small}
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
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: 'column'
                        }}
                    >
                        <WrappedText
                            lines={2}
                        >
                            {progressContext.manga.name}
                        </WrappedText>
                        <Typography variant="caption" color="textSecondary">
                            Глава {progressContext.chapter.chapter}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption">Страница {progress.page+1} из {progressContext.chapter.pages_count}</Typography>
                        <LinearProgress 
                            variant="determinate"
                            value={((progress.page+1) / progressContext.chapter.pages_count) * 100} 
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
                            onDelete?.(progress.id)
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
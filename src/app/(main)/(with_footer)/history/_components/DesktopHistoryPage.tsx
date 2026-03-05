"use client"

import { Box, Container, Typography, useTheme } from "@mui/material"
import HistoryLoader from "./HistoryLoader"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import DesktopReadingProgress from "./DesktopReadingProgress"
import { v4 } from "uuid"
import { historyService } from "../_services/historyService"
import { setHistoryPageReadingProgresses } from "@/lib/state/features/historyPage/historyPageSlice"
import { redirect } from "next/navigation"
import { ROUTES } from "@/routes"
import { useEffect, useState } from "react"
import { range } from "lodash"
import DesktopReadingProgressSkeleton from "./DesktopReadingProgressSkeleton"

export default function DesktopHistoryPage() {
    const theme = useTheme()

    const dispatch = useAppDispatch()

    const [historyLoading, setHistoryLoading] = useState(true)

    const authProfile = useAppSelector(state => state.authProfile.profile)

    const history = useAppSelector(state => state.historyPage.reading_progresses)

    useEffect(() => {
        if (!authProfile) return

        historyService.getProgress(authProfile)
            .then(resp => {
                dispatch(setHistoryPageReadingProgresses(resp.data))

                setHistoryLoading(false)
            })
    }, [authProfile])

    if (authProfile == null)
        return redirect(ROUTES.HOME)

    return (
        <Container maxWidth="lg">
            <Typography 
                variant="h1"
                sx={{
                    mt: "50px"
                }}
            >
                История чтения
            </Typography>
            {historyLoading ? 
                <>
                    {range(0, 5).map(v => (
                        <DesktopReadingProgressSkeleton key={`reading_skeleton_${v}`}/>
                    ))}
                </>
                :
                <>
                    {history?.length ?
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: theme.spacing(3)
                            }}
                        >
                            {history.map(rp => (
                                <DesktopReadingProgress 
                                    key={`reading_progress_${v4()}`}
                                    progress={rp}
                                    onDelete={async () => {
                                        await historyService.deleteProgress(rp)

                                        dispatch(setHistoryPageReadingProgresses(history.filter(v => v.manga.id != rp.manga.id)))
                                    }}
                                />
                            ))}
                        </Box>
                        :
                        <Box
                            sx={{
                                py: "50px"
                            }}
                        >
                            <Typography 
                                fontSize={"18px"}
                                textAlign={"center"}
                            >
                                У вас нет истории чтения!
                            </Typography>
                        </Box>
                    }
                </>
            }
        </Container>
    )
}
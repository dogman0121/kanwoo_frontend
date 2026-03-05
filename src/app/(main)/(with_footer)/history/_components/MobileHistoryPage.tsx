"use client"

import { Box, Typography, useTheme } from "@mui/material"
import MobileReadingProgress from "./MobileReadingProgress"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { historyService } from "../_services/historyService"
import { v4 } from "uuid"
import { setHistoryPageReadingProgresses } from "@/lib/state/features/historyPage/historyPageSlice"
import { useEffect, useState } from "react"
import { range } from "lodash"
import MobileReadingProgressSkeleton from "./MobileReadingProgressSkeleton"

export default function MobileHistoryPage() {
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
        return <>123</>

    return (
        <Box
            sx={{
                p: "10px"
            }}
        >
            <Typography 
                variant="h1"
            >
                История чтения
            </Typography>
            {historyLoading ?
                <>
                    {range(0, 5).map(v => (
                        <MobileReadingProgressSkeleton key={`reading_skeleton_${v}`}/>
                    ))}
                </>
                :
                <>
                    {history?.length ?
                        <Box
                            sx={{
                                mt: theme.spacing(3),
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                                gap: theme.spacing(3)
                            }}
                        >
                            {history.map(rp => (
                                <MobileReadingProgress
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
        </Box>
    )
}
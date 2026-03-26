"use client"

import EditHeader from "@/features/edit/components/EditHeader"
import EditPageContainer from "@/features/edit/components/EditPageContainer"
import { clientFetch } from "@/lib/fetch/clientFetch"
import { setAdminPageMainDashboard } from "@/lib/state/features/adminPage/adminPageSlice"
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/state/hooks"
import { Box, Grid, Typography } from "@mui/material"
import { useEffect } from "react"

interface GridIndicatorProps {
    value: number,
    desctiption: string
}

function GridIndicator({value, desctiption}: GridIndicatorProps) {
    return (
        <Grid 
            size={3}
        >
            <Box
                sx={{
                    bgcolor: "secondary.main",

                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: "12px",
                    p: "15px"
                }}
            >
                <Typography fontSize="48px"
                >
                    {value}
                </Typography>
                <Typography fontSize={"16px"}>{desctiption}</Typography>
            </Box>
        </Grid>
    )
}


export default function Page() {
    const dispatch = useAppDispatch()

    const mainDashboard = useAppSelector(state => state.adminPage.mainDashboard)

    useEffect(() => {
        clientFetch.get(`/admin/dashboards/main`)
        .then(resp => {
            dispatch(setAdminPageMainDashboard(resp.data))
        })
    }, [])
    
    if (!mainDashboard) return;

    return (
        <>
            <EditHeader>Дэшборд</EditHeader>
            <EditPageContainer>
                <Grid
                    container
                    columns={{lg: 18, md: 9, sm: 6, xs: 3}}
                    spacing={3}
                >
                    <GridIndicator 
                        value={mainDashboard.feedback_messages_count}
                        desctiption={"Сообщений в обратной связи"}
                    />
                    <GridIndicator 
                        value={mainDashboard.manga_reports_count}
                        desctiption={"Жалоб на манги"}
                    />
                    <GridIndicator 
                        value={mainDashboard.chapters_reports_count}
                        desctiption={"Жалоб на главы"}
                    />
                    <GridIndicator 
                        value={mainDashboard.manga_waiting_moderation_count}
                        desctiption={"Манг ожидают модерации"}
                    />
                    <GridIndicator 
                        value={mainDashboard.chapter_waiting_moderation_count}
                        desctiption={"Глав ожидают модерации"}
                    />
                    <GridIndicator 
                        value={mainDashboard.manga_sugesstions_count}
                        desctiption={"Предложений манги"}
                    />
                </Grid>
            </EditPageContainer>
        </>
    )
}
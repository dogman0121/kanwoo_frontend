"use client"

import { EditPageHeader, EditPageTitle } from "@/features/edit/components/EditHeader";
import EditPageContainer from "@/features/edit/components/EditPageContainer";
import { clientFetch } from "@/lib/fetch/clientFetch";
import AdminFeedback from "@/types/admin/feedback/feedback";
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Typography, useTheme } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { AdminAccordion, AdminAccordionActions, AdminAccordionDetails, AdminAccordionSummary } from "../_features/accordion/Accordion";
import LoadingBox from "../_features/LoadingBox";
import EmptyTitle from "../_features/EmptyTitle";
import ProfileWidget from "../_components/ProfileWidget";
import { resolveService } from "../_services/resolveService";
import ResolveFiltersGroup from "../_components/ResolveFiltersGroup";

export default function Page() {
    const theme = useTheme()

    const [isLoading, setIsLoading] = useState(false)

    const [results, setResults] = useState<AdminFeedback[]>([])

    const [filters, setFilters] = useState({
            unresolved: false, 
            resolved: false
        })

    useEffect(() => {
        setIsLoading(true)
        
        clientFetch.get<AdminFeedback[]>("/admin/feedbacks/getFeedbacks?" + resolveService.compileParams(filters).toString())
            .then(resp => {
                setResults(resp.data)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [filters])

    return (
        <>
            <EditPageHeader>
                <EditPageTitle>Обратная связь</EditPageTitle>
            </EditPageHeader>
            <EditPageContainer
                sx={{
                    p: "10px 25px"
                }}
            >
                <ResolveFiltersGroup 
                    value={filters}
                    onChange={(v) => setFilters(v)}
                />
                <LoadingBox
                    loading={isLoading}
                    sx={{
                        mt: theme.spacing(3),
                        display: "flex",
                        flexDirection: "column",
                        gap: theme.spacing(3)
                    }}
                >
                    {results.length != 0 ?
                        <>
                            {results.map(res => (
                                <AdminAccordion
                                    key={`admin_feedback_${res.id}`}
                                >
                                    <AdminAccordionSummary
                                    >
                                        <Grid
                                            container
                                            columns={7}
                                            spacing={3}
                                            sx={{
                                                alignItems: "center",
                                                width: "100%"
                                            }}
                                        >
                                            <Grid size={1}>
                                                <Typography>
                                                    {new Date(res.created_at).toLocaleDateString("ru-RU")}
                                                </Typography>
                                            </Grid>
                                            <Grid size={1}>
                                                <ProfileWidget profile={res.creator}/>                                                
                                            </Grid>
                                            <Grid size={1}>
                                                {res.resolved_at ?
                                                    <Typography color="success">обработано</Typography>
                                                    :
                                                    <Typography color="warning">Ожидает</Typography>
                                                }
                                            </Grid>
                                            <Grid size={4}>
                                                <Typography>{res.message}</Typography>
                                            </Grid>
                                        </Grid>
                                    </AdminAccordionSummary>
                                    <AdminAccordionDetails>
                                        <Grid
                                            container
                                            columns={12}
                                            spacing={3}
                                        >
                                            <Grid
                                                size={3}
                                            >
                                                <Typography fontWeight={600}>Дата создания</Typography>
                                                <Typography>{ new Date(res.created_at).toLocaleDateString("ru-RU") }</Typography>
                                            </Grid>
                                            <Grid
                                                size={3}
                                            >
                                                <Typography fontWeight={600}>Автор</Typography>
                                                <ProfileWidget profile={res.creator}/>
                                            </Grid>
                                            <Grid
                                                size={6}
                                            >
                                                <Typography fontWeight={600}>Сообщение</Typography>
                                                <Typography>{res.message}</Typography>
                                            </Grid>
                                            <Grid
                                                size={3}
                                            >
                                                <Typography fontWeight={600}>Обработано</Typography>
                                                { res.resolved_at ?
                                                    <Typography>{ new Date(res.resolved_at).toLocaleDateString("ru-RU") }</Typography>
                                                    :
                                                    <Typography>нет</Typography>
                                                }
                                            </Grid>
                                            <Grid
                                                size={3}
                                            >
                                                <Typography fontWeight={600}>Обработчик</Typography>
                                                <ProfileWidget profile={res.resolver}/>
                                            </Grid>
                                        </Grid>
                                    </AdminAccordionDetails>
                                    <AdminAccordionActions>
                                        <Button
                                            variant="contained"
                                            disabled={res.resolved_at != null}
                                            onClick={() => {
                                                clientFetch.post<AdminFeedback>(`/admin/feedbacks/${res.id}/resolve`)
                                                    .then(resp => {
                                                        res.resolved_at = resp.data.resolved_at
                                                        res.resolver = resp.data.resolver
                                                    })  
                                            }}
                                        >
                                            Обработать
                                        </Button>
                                    </AdminAccordionActions>
                                </AdminAccordion>   
                            ))}
                        </>
                        :
                        <EmptyTitle />
                    }
                </LoadingBox>
            </EditPageContainer>
        </>
    )
}
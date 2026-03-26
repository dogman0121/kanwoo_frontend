"use client"

import { EditPageHeader, EditPageTitle } from "@/features/edit/components/EditHeader";
import EditPageContainer from "@/features/edit/components/EditPageContainer";
import { ROUTES } from "@/routes";
import { Breadcrumbs, Grid, Link, Typography, useTheme } from "@mui/material";
import ResolveFiltersGroup, { ResolveFilterType } from "../../_components/ResolveFiltersGroup";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { resolveService } from "../../_services/resolveService";
import { clientFetch } from "@/lib/fetch/clientFetch";
import AdminMangaSuggestion from "@/types/admin/manga/mangaSuggestion";
import LoadingBox from "../../_features/LoadingBox";
import EmptyTitle from "../../_features/EmptyTitle";
import { AdminAccordion, AdminAccordionActions, AdminAccordionDetails, AdminAccordionSummary } from "../../_features/accordion/Accordion";
import ProfileWidget from "../../_components/ProfileWidget";

export default function Page() {
    const theme = useTheme()

    const [isLoading, setIsLoading] = useState(false)

    const [filters, setFilters] = useState<ResolveFilterType>({resolved: false, unresolved: false})

    const [results, setResults] = useState<AdminMangaSuggestion[]>([])

    useEffect(debounce(() => {
        setIsLoading(true)

        const urlSearchParams = resolveService.compileParams(filters)

        clientFetch.get<AdminMangaSuggestion[]>("/admin/manga/suggestions?" + urlSearchParams.toString())
            .then(resp => {
                setResults(resp.data)
            })
            .finally(() => {
                setIsLoading(false)
            })
        
    }, 200), [filters])

    return (
        <>
            <EditPageHeader
                underline
            >
                <Breadcrumbs>
                    <Link 
                        href={ROUTES.ADMIN.MANGA.MAIN}
                    >
                        Манга
                    </Link>
                    <Typography>Предложения</Typography>
                </Breadcrumbs>
                <EditPageTitle>Предложения</EditPageTitle>
            </EditPageHeader>
            <EditPageContainer
                sx={{
                    pt: theme.spacing(2),
                    pb: theme.spacing(4)
                }}
            >
                <ResolveFiltersGroup 
                    value={filters}
                    onChange={setFilters}
                />
                <LoadingBox
                    loading={isLoading}
                    sx={{
                        mt: theme.spacing(2)
                    }}
                >
                    {results.length ?
                        <>
                            {results.map(suggestion => (
                                <AdminAccordion
                                    key={`manga_suggestion_${suggestion.id}`}
                                >
                                    <AdminAccordionSummary>
                                        <Grid
                                            container
                                            columns={6}
                                            spacing={3}
                                            sx={{
                                                width: "100%",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Grid
                                                size={1}
                                            >
                                                <Typography variant="caption">
                                                    { new Date(suggestion.created_at).toLocaleDateString("ru-RU") }
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                size={1}
                                            >
                                                <ProfileWidget 
                                                    profile={suggestion.creator}
                                                />
                                            </Grid>
                                            <Grid
                                                size={4}
                                            >
                                                <Typography>{ suggestion.name }</Typography>
                                            </Grid>
                                        </Grid>
                                    </AdminAccordionSummary>
                                    <AdminAccordionDetails>

                                    </AdminAccordionDetails>
                                    <AdminAccordionActions>

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
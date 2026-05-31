"use client"

import { EditPageHeader, EditPageNavbar, EditPageTitle } from "@/features/edit/components/EditHeader";
import { Box, Breadcrumbs, Button, Chip, CircularProgress, Divider, FormControl, Grid, GridProps, Input, SxProps, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { debounce } from "lodash";
import { clientFetch } from "@/lib/fetch/clientFetch";
import EditPageContainer from "@/features/edit/components/EditPageContainer";
import AdminManga from "@/types/admin/manga/manga";
import Poster from "@/components/Poster";
import AdminMangaContext from "./_contexts/mangaContext";
import AdminMangaModerationStatus from "@/types/admin/manga/moderationStatus";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes";
import { MODERATION_STATUS } from "../_types/moderationStatus";
import ModerationActions from "../_components/ModerationActions";
import { AdminAccordion, AdminAccordionActions, AdminAccordionDetails, AdminAccordionSummary } from "../_features/accordion/Accordion";
import ProfileWidget from "../_components/ProfileWidget";
import { adminModerationService } from "../_services/moderationService";
import LoadingBox from "../_features/LoadingBox";
import EmptyTitle from "../_features/EmptyTitle";
import ModerationFiltersGroup, { ModerationFilterType } from "../_components/ModerationFiltersGroup";
import CreateMangaDialog from "./_components/CreateMangaDialog";
import { usePagePagination } from "@/features/pagination/hooks/usePagePagination";
import SearchInput from "../_components/SearchInput";
import InfiniteScroll from "react-infinite-scroll-component";

const compileColor = (moderation_status: AdminMangaModerationStatus | null) => {
    if (!moderation_status)
        return 

    switch(moderation_status.status_type.id) {
        case(MODERATION_STATUS.APPROVED):
            return "success"

        case(MODERATION_STATUS.REJECTED):
            return "error"

        case(MODERATION_STATUS.WAITING):
            return "warning"
    }
}

function MangaCardShortData() {
    const {manga} = useContext(AdminMangaContext)

    if (!manga) return null

    return (
        <Grid
            container
            columns={7}
            sx={{
                width: "100%",
                alignItems: "center"
            }}
        >
            <Grid
                size={3}
                spacing={2}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 4
                    }}
                >
                    <Poster 
                        src={manga.poster?.medium}
                        width="75px"
                    />
                    <Typography>
                        {manga.name}
                    </Typography>
                </Box>
            </Grid>
            <Grid
                size={1}
            >
                <Typography>
                    {manga.privacy?.name || "нет"}
                </Typography>
            </Grid>
            <Grid
                size={1}
            >
                <Typography>
                    {new Date(manga.created_at).toLocaleDateString("ru-RU")}
                </Typography>
            </Grid>
            <Grid
                size={1}
            >
                <Typography
                    color={compileColor(manga.moderation_status)}
                >
                    {manga.moderation_status?.status_type.name || "нет"}
                </Typography>
            </Grid>
            <Grid
                size={1}
            >
                <ProfileWidget 
                    profile={manga.author}
                />
            </Grid>
        </Grid>
    )
}

function MangaCardFullData({sx}: {sx?: SxProps}) {
    const theme = useTheme()

    const {manga} = useContext(AdminMangaContext)

    if (!manga) return

    return (
        <Grid
            container
            columns={12}
            spacing={3}
            sx={{
                ...sx
            }}
        >
            <Grid
                size={3}
            >
                <Typography fontWeight={600}>Название</Typography>
                <Typography>{manga.name}</Typography>
            </Grid>
            <Grid
                size={3}
            >
                <Typography fontWeight={600}>Тег</Typography>
                <Typography>{manga.slug}</Typography>
            </Grid>
            <Grid
                size={3}
            >
                <Typography fontWeight={600}>Другие названия</Typography>
                <Box>
                    {manga.name_translations.length > 0 ? 
                        <Breadcrumbs sx={{mt: theme.spacing(1)}}>
                            {manga.name_translations.map(name => (
                                <Typography 
                                    key={`admin_manga_name_translation_${name.lang}`}
                                >
                                    {name.name}
                                </Typography>
                            ))}
                        </Breadcrumbs>
                        :
                        <Typography>Нет</Typography>    
                    }
                </Box>
            </Grid>
            <Grid
                size={3}
            >
                <Typography fontWeight={600}>Приватность</Typography>
                <Typography>{manga.privacy?.name || "нет"}</Typography>
            </Grid>
            <Grid
                size={12}
            >
                <Typography whiteSpace="pre-wrap" fontWeight={600}>Описание</Typography>
                <Typography>{manga.description || "нет"}</Typography>
            </Grid>
            <Grid
                size={3}
            >
                <Typography fontWeight={600}>Тип</Typography>
                <Typography>{manga.type?.name || "нет"}</Typography>
            </Grid>
            <Grid
                size={3}
            >
                <Typography fontWeight={600}>Статус</Typography>
                <Typography>{manga.status?.name || "нет"}</Typography>
            </Grid>
            <Grid
                size={3}
            >
                <Typography fontWeight={600}>Возрастное ограничение</Typography>
                <Typography>{manga.adult?.name || "нет"}</Typography>
            </Grid>
            <Grid
                size={3}
            >
                <Typography fontWeight={600}>Год создания</Typography>
                <Typography>{manga.year}</Typography>
            </Grid>
            <Grid
                size={12}
            >
                <Typography fontWeight={600}>Жанры</Typography>
                {manga.genres.length > 0 ?
                    <Box
                        sx={{
                            mt: "5px",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px"
                        }}
                    >
                        {manga.genres.map(g => (
                            <Chip
                                key={`admin_manga_${manga.id}_genre_${g.id}`}
                                label={g.name}
                            />
                        ))}
                    </Box>
                    :
                    <Typography>нет</Typography>
                }
            </Grid>
            <Grid
                size={2}
            >
                <Typography fontWeight={600}>Постер</Typography>
                {manga.poster ?
                    <Poster 
                        src={manga.poster.medium}
                        style={{
                            marginTop: "5px",
                        }}
                    />
                    :
                    <Typography>нет</Typography>
                }
            </Grid>
            <Grid
                size={5}
            >
                <Typography fontWeight={600}>Задний фон</Typography>
                {manga.background ?
                    <img
                        alt="background"
                        src={manga.background}
                        style={{
                            maxWidth: "100%",
                            borderRadius: "12px",
                            marginTop: "5px"
                        }}  
                    />
                    :
                    <Typography>нет</Typography>
                }
            </Grid>
            <Grid
                size={3}
            >
                <Typography fontWeight={600}>Промо лого</Typography>
                {manga.background ?
                    <img
                        alt="background"
                        src={manga.promo_logo}
                        style={{
                            maxWidth: "100%",
                            borderRadius: "12px",
                            marginTop: "5px"
                        }}  
                    />
                    :
                    <Typography>нет</Typography>
                }
            </Grid>
            <Grid
                size={3}
            >
                <Typography fontWeight={600}>Промо название</Typography>
                {manga.promo_name ?
                    <img
                        alt="promo_name"
                        src={manga.promo_name}
                        style={{
                            maxWidth: "100%",
                            borderRadius: "12px",
                            marginTop: "5px"
                        }}  
                    />
                    :
                    <Typography>нет</Typography>
                }
            </Grid>
            <Grid
                size={6}
            >
                <Typography fontWeight={600}>Промо задний фон</Typography>
                {manga.promo_background ?
                    <img
                        alt="promo_background"
                        src={manga.promo_background}
                        style={{
                            maxWidth: "100%",
                            borderRadius: "12px",
                            marginTop: "5px"
                        }}  
                    />
                    :
                    <Typography>нет</Typography>
                }
            </Grid>
        </Grid>
    )
}

function ModerationStatusGrid({...props}: GridProps) {
    return (
        <Grid
            container
            columns={8}
            spacing={3}
            alignItems={"center"}
            {...props}
        />
    )
}

function MangaModerationStatusHistory({sx}: {sx?: SxProps}) {
    const theme = useTheme()

    const {manga} = useContext(AdminMangaContext)

    if (!manga) return;

    return (
         <Box
            sx={{
                mt: theme.spacing(3),
                ...sx
            }}
        >
            <Typography fontWeight={600}>История модерации</Typography>
            <ModerationStatusGrid>
                <Grid size={2}><Typography variant="caption">Дата</Typography></Grid>
                <Grid size={1}><Typography variant="caption">Статус</Typography></Grid>
                <Grid size={1}><Typography variant="caption">Автор</Typography></Grid>
                <Grid size={4}><Typography variant="caption">Сообщение</Typography></Grid>
            </ModerationStatusGrid>
            {manga.moderation_history.length > 0 ? 
                <Box
                    sx={{
                        mt: theme.spacing(1),
                        display: "flex",
                        flexDirection: "column",
                        gap: theme.spacing(3)
                    }}
                >
                    {manga.moderation_history.map(status => (
                        <ModerationStatusGrid
                            key={`moderation_status_${status.id}`}
                        >
                            <Grid
                                size={2}
                            >
                                <Typography>
                                    {new Date(status.created_at).toLocaleString("ru-RU")}
                                </Typography>
                            </Grid>
                            <Grid
                                size={1}
                            >
                                <Typography
                                    color={compileColor(status)}
                                >
                                    {status.status_type.name}
                                </Typography>
                            </Grid>
                            <Grid
                                size={2}
                            >
                                <ProfileWidget 
                                    profile={status.creator}
                                />
                            </Grid>
                            <Grid
                                size={3}
                            >
                                {status.message ?
                                    <Typography>
                                        {status.message}
                                    </Typography>
                                    :
                                    <Typography>
                                        нет
                                    </Typography>
                                }
                            </Grid>
                        </ModerationStatusGrid>
                    ))}
                </Box>
                :
                <Typography
                    sx={{
                        py: theme.spacing(2),
                    }}
                >
                    История пуста
                </Typography>
            }
        </Box>
    )
}

function MangaCardActions({
    onApprove,
    onReject,
    onWaiting
}: {
    onApprove: (message?: string) => void,
    onReject: (message?: string) => void,
    onWaiting: (message?: string) => void
}) {
    const {manga} = useContext(AdminMangaContext)

    if (!manga) return null

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                pl: 3
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    alignItems: "center"
                }}
            >
                <Typography>Создано:</Typography>
                <ProfileWidget profile={manga.creator}/>
            </Box>
            <ModerationActions 
                value={manga.moderation_status.status_type.id}
                onApprove={(msg) => onApprove(msg)}
                onReject={(msg) => onReject(msg)}
                onWaiting={(msg) => onWaiting(msg)}
            />
        </Box>
    )
}

function MangaCard({manga}: {manga: AdminManga}) {
    const [accordionExpanded, setAccordionExpanded] = useState(false)

    const updateModeration = async (status_id: number, message?: string) => {
        const {data: moderationStatus} = await clientFetch.post<AdminMangaModerationStatus>(
            `/admin/manga/${manga.slug}/update-moderation`, 
            {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status_type: status_id, 
                    message: message
                })
            }
        )

        manga.moderation_status = moderationStatus
        manga.moderation_history.push(moderationStatus)

        setAccordionExpanded(false)
    }

    return (
        <AdminMangaContext.Provider
            value={{manga: manga}}
        >
            <AdminAccordion
                expanded={accordionExpanded}
                onChange={(_event, expanded) => setAccordionExpanded(expanded)}
            >
                <AdminAccordionSummary>
                    <MangaCardShortData/>
                </AdminAccordionSummary>                    
                <AdminAccordionDetails>
                    <MangaCardFullData />
                    <MangaModerationStatusHistory 
                        sx={{
                            mt: "20px"
                        }}
                    />
                </AdminAccordionDetails>
                <AdminAccordionActions
                    
                >
                    <MangaCardActions 
                        onApprove={(msg) => updateModeration(MODERATION_STATUS.APPROVED, msg)}
                        onReject={(msg) => updateModeration(MODERATION_STATUS.REJECTED, msg)}
                        onWaiting={(msg) => updateModeration(MODERATION_STATUS.WAITING, msg)}
                    />
                </AdminAccordionActions>
            </AdminAccordion>
        </AdminMangaContext.Provider>
    )
}

export default function Page() {
    const router = useRouter()

    const [mangaDialogOpen, setMangaDialogOpen] = useState(false)
    const [query, setQuery] = useState("")
    
    const [filters, setFilter] = useState<ModerationFilterType>({
        approved: false, 
        rejected: false, 
        waiting: false
    })

    const [loading, setLoading] = useState(false)
    
    const {
        results: manga,
        setResults: setManga,
        page,
        setPage,
        perPage,
        totalCount,
        setTotalCount,
        reset,
        hasMore,
    } = usePagePagination<AdminManga>({ perPage: 20 });


    const fetchManga = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const urlSearchParams = adminModerationService.compileModerationStatusFilters(filters)
            if (query)
                urlSearchParams.append("query", query)

            urlSearchParams.append("page", page.toString())
            urlSearchParams.append("per_page", perPage.toString())

            const response = await clientFetch.get<AdminManga[]>("/admin/manga?" + urlSearchParams.toString());

            const pagination = response.pagination;
            if (!pagination ||  !("page" in pagination)) 
                throw Error("Failed to get pagination from response!")

            setPage(pagination.page+1)
            setTotalCount(pagination.total_count)

            setManga(manga => [...manga, ...response.data])
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(debounce(() => {
        reset()
        fetchManga()
    }, 100), [query, filters])

    return (
        <>
            <EditPageHeader>
                <Breadcrumbs>
                    <Typography>Манга</Typography>
                </Breadcrumbs>
                <EditPageTitle>Манга</EditPageTitle>
            </EditPageHeader>
            <EditPageNavbar>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => router.push(ROUTES.ADMIN.MANGA.SUGGESTIONS)}
                >
                    Предложения
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setMangaDialogOpen(true)}
                >
                    Создать
                </Button>
            </EditPageNavbar>
            <SearchInput 
                onChange={(event) => setQuery(event.target.value)}
            />
            <Divider />
            <EditPageContainer
                sx={{
                    py: 1
                }}
            >
                <ModerationFiltersGroup
                    value={filters}
                    onChange={setFilter}
                />
            </EditPageContainer>
            <Divider />
            <EditPageContainer
                sx={{
                    py: 1
                }}
            >
                <Grid
                    container
                    columns={7}
                    sx={{
                        pl: 3,
                        pr: "calc(15px + 24px)"
                    }}
                >
                    <Grid size={3}>
                        <Typography variant="caption">Название</Typography>
                    </Grid>
                    <Grid size={1}>
                        <Typography variant="caption">Приватность</Typography>
                    </Grid>
                    <Grid size={1}>
                        <Typography variant="caption">Дата создания</Typography>
                    </Grid>
                    <Grid size={1}>
                        <Typography variant="caption">Модерация</Typography>
                    </Grid>
                    <Grid size={1}>
                        <Typography variant="caption">Автор</Typography>
                    </Grid>
                </Grid>
            </EditPageContainer>
            <Divider />
            <EditPageContainer
                sx={{
                    pt: 2,
                    pb: 4
                }}
            >
                <Typography
                >
                    Найдено результатов: {totalCount}
                </Typography>
                <InfiniteScroll
                    style={{
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px"
                    }}
                    dataLength={manga.length}
                    next={fetchManga}
                    hasMore={hasMore}
                    loader={<CircularProgress />}
                >
                    {manga.map(m => (
                        <MangaCard manga={m} key={`admin_manga_${m.id}`}/>
                    ))}   
                </InfiniteScroll>
            </EditPageContainer>
            <CreateMangaDialog 
                open={mangaDialogOpen}
                onClose={() => setMangaDialogOpen(false)}
            />
        </>
    )
}
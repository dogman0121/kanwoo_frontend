"use client"

import { EditPageHeader, EditPageNavbar, EditPageTitle } from "@/features/edit/components/EditHeader";
import { Box, Breadcrumbs, Button, Chip, Divider, FormControl, Grid, GridProps, Input, SxProps, Typography, useTheme } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { useContext, useEffect, useState } from "react";
import { debounce } from "lodash";
import { clientFetch } from "@/lib/fetch/clientFetch";
import EditPageContainer from "@/features/edit/components/EditPageContainer";
import AdminManga from "@/types/admin/manga/manga";
import Poster from "@/components/Poster";
import AdminMangaContext from "./_contexts/mangaContext";
import { adminMangaService } from "./_services/mangaService";
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
import Image from "next/image";

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
        <Box
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "25px"
            }}
        >
            <Poster 
                src={manga.poster?.medium}
                width="75px"
            />
            <Grid
                container
                columns={4}
                sx={{
                    width: "100%",
                    alignItems: "center"
                }}
            >
                <Grid
                    size={1}
                >
                    <Typography>
                        {manga.name}
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
                        profile={manga.creator}
                    />
                </Grid>
            </Grid>
        </Box>
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
                <Typography fontWeight={600}>Тип</Typography>
                <Typography>{manga.type?.name || "нет"}</Typography>
            </Grid>
            <Grid
                size={12}
            >
                <Typography fontWeight={600}>Описание</Typography>
                <Typography>{manga.description || "нет"}</Typography>
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
                size={3}
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
                size={3}
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
                size={8}
            >
                <Typography fontWeight={600}>Задний фон</Typography>
                {manga.background ?
                    <Image
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
                    <Image
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
                    <Image
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
                    <Image
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
                <Grid size={1}><Typography variant="caption">Дата</Typography></Grid>
                <Grid size={1}><Typography variant="caption">Статус</Typography></Grid>
                <Grid size={1}><Typography variant="caption">Автор</Typography></Grid>
                <Grid size={5}><Typography variant="caption">Сообщение</Typography></Grid>
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
                                size={1}
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
                                size={1}
                            >
                                <ProfileWidget 
                                    profile={status.creator}
                                />
                            </Grid>
                            <Grid
                                size={5}
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
                <Typography>История пуста</Typography>
            }
        </Box>
    )
}

function MangaCard({manga}: {manga: AdminManga}) {
    const theme = useTheme()

    const [accordionExpanded, setAccordionExpanded] = useState(false)

    const updateModeration = async (status_id: number, message?: string) => {
        const {data: moderationStatus} = await adminMangaService.setMangaStatus(manga, status_id, message)

        manga.moderation_status = moderationStatus

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
                <AdminAccordionActions>
                    <ModerationActions 
                        value={manga.moderation_status?.status_type.id}
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
    const theme = useTheme()

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const [query, setQuery] = useState("")
    
    const [filters, setFilter] = useState<ModerationFilterType>({
        approved: false, 
        rejected: false, 
        waiting: false
    })

    const [results, setResults] = useState<AdminManga[]>([])

    useEffect(debounce(() => {
        setIsLoading(true)

        const urlSearchParams = adminModerationService.compileModerationStatusFilters(filters)
        
        if (query)
            urlSearchParams.append("query", query)

        clientFetch.get<AdminManga[]>("/admin/manga/getMangaList?" + urlSearchParams.toString())
            .then(resp => {
                setResults(resp.data)
                
                setIsLoading(false)
            })
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
            </EditPageNavbar>
            <Box
                sx={{
                    p: "10px 25px"
                }}
            >
                <FormControl
                    fullWidth 
                >
                    <Input
                        disableUnderline
                        placeholder="Введите запрос"
                        onChange={(event) => setQuery(event.target.value)}
                        startAdornment={
                            <SearchRoundedIcon 
                                sx={{
                                    marginRight: "10px",
                                }}
                            />
                        }
                    />
                </FormControl>
            </Box>
            <Divider />
            <EditPageContainer
                sx={{
                    pt: "5px",
                    pb: "20px"
                }}
            >
                <ModerationFiltersGroup
                    value={filters}
                    onChange={setFilter}
                />
                <LoadingBox
                    loading={isLoading}
                    sx={{
                        mt: theme.spacing(2),
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px"
                    }}
                >
                    {results.length > 0 ?
                        <>
                            {results.map(m => (
                                <MangaCard manga={m} key={`admin_manga_${m.id}`}/>
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
import EditHeader from "@/components/edit/EditHeader";
import EditHeaderNav from "@/components/edit/EditHeaderNav";
import EditPageContainer from "@/components/edit/EditPageContainer";
import Poster from "@/components/poster/Poster";
import { Privacy } from "@/components/PrivacySelect";
import WrappedText from "@/components/WrapperTypography";
import { routes, toHref } from "@/constants/routes/main.routes";
import CreateMangaDialog from "@/features/studio/components/CreateMangaDialog";
import { Manga } from "@/features/manga/types";
import StudioList from "@/features/studio/components/List";
import StudioPrivacyStatus from "@/features/studio/components/ui/PrivacyStatus";
import { addManga, selectManga } from "@/features/studio/states/profile/manga.slice";
import { selectCreateMangaDialogOpen, selectProfile, setCreateMangaDialogOpen } from "@/features/studio/states/profile/page.slice";
import { StudioManga } from "@/features/studio/types/studio-manga.type";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, Button, Divider, Grid, Stack, SxProps, Typography } from "@mui/material";
import Link from "next/link";
import React, { Children, useState } from "react";
import { convertFormToFormData, MangaCreateFormSchema } from "@/features/studio/forms/CreateMangaForm";
import { studioClientAPI } from "@/features/studio/api/client.api";
import { openSnackbar } from "@/features/global/states/app/slice";
import { selectTranslations } from "@/features/studio/states/manga/translations.slice";


function MangaGrid({children}: {children: React.ReactNode}) {
    return (
        <Box
            sx={{
                px: 5,
                py: 1
            }}
        >
            <Grid
                container
                columns={14}
                spacing={3}
                alignItems={"center"}
            >
                {Children.map(children, c => c)}
            </Grid>
        </Box>
    )
}

function MangaGridRow({manga}: {manga: StudioManga}){ 

    return (
        <MangaGrid>
            <Grid
                size={6}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems :"center",
                        gap: 2
                    }}
                >
                    <Poster 
                        width="80px"
                        src={manga.poster?.medium}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "5px"
                        }}
                    >
                        <Typography variant="caption">
                            {manga.type?.name} / {manga.year}
                            </Typography>
                        <Link href={toHref(routes.studio.manga.item, {slug: manga.slug})}>
                            <Typography
                                variant="h3"
                                sx={{
                                    "&:hover": {
                                        textDecoration: "underline"
                                    }
                                }}
                            >
                                {manga.name}
                            </Typography>
                        </Link>
                        <WrappedText
                            lines={2}
                            variant="caption"
                            color="textSecondary"
                        >
                            {manga.description}
                        </WrappedText>
                    </Box>
                </Box>
            </Grid>
            <Grid size={2}>
                <StudioPrivacyStatus privacy={manga.privacy.id as Privacy}/>
            </Grid>
            <Grid size={2}>
                <Typography>{manga.moderation_status.status_type.name}</Typography>
            </Grid>
            <Grid size={2}>
                <Typography>{manga.stats.comments}</Typography>
            </Grid>
            <Grid size={2}>
                <Typography>{manga.stats.views}</Typography>    
            </Grid>                
        </MangaGrid>
    )
}

export default function PPage() {
    const dispatch = useAppDispatch()

    const manga = useAppSelector(selectManga)
    const profile = useAppSelector(selectProfile)

    const createMangaDialogOpen = useAppSelector(selectCreateMangaDialogOpen)

    const handleCreateManga = async (data: MangaCreateFormSchema) => {
        if (!profile) return

        try {
            const formData = convertFormToFormData(data)

            const response = await studioClientAPI.createManga(profile.slug, formData)

            dispatch(addManga({
                data: response.data,
                context: response.context,
                permission: response.permission
            }))
            dispatch(openSnackbar({type: "success", message: "Манга добавлена успешно"}))
            dispatch(setCreateMangaDialogOpen(false))
        } catch (e) {
            let errorMessage = "неизвестная ошибка"

            dispatch(openSnackbar({
                type: "error",
                message: `При добавлении манги произошла ошибка: ${errorMessage}`
            }))
        }
    }

    return (
        <>
            <EditHeader>Мои тайтлы</EditHeader>
            <EditHeaderNav 
                buttons={
                    <>
                        <Button
                            variant="contained"
                            onClick={() => dispatch(setCreateMangaDialogOpen(true))}
                        >
                            Создать
                        </Button>
                    </>
                }
            />
            <MangaGrid>
                <Grid size={6}>
                    <Typography variant="caption">Тайтл</Typography>
                </Grid>
                <Grid size={2}>
                    <Typography variant="caption">Доступ</Typography>
                </Grid>
                <Grid size={2}>
                    <Typography variant="caption">Модерация</Typography>
                </Grid>
                <Grid size={2}>
                    <Typography variant="caption">Комментарии</Typography>
                </Grid>
                <Grid size={2}>
                    <Typography variant="caption">Просмотры</Typography>
                </Grid>
            </MangaGrid>
            <Divider />
            <StudioList
                py={4}
            >
                {manga?.map((m) => (
                    <MangaGridRow key={m.data.slug} manga={m.data}/>
                ))}
            </StudioList>
            <CreateMangaDialog 
                open={createMangaDialogOpen}
                onCreate={handleCreateManga}
                onClose={() => dispatch(setCreateMangaDialogOpen(false))}
            />
        </>
    )
}
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
import StudioPrivacyStatus from "@/features/studio/components/PrivacyStatus";
import { selectManga } from "@/features/studio/states/profile/manga.slice";
import { setCreateMangaDialogOpen } from "@/features/studio/states/profile/page.slice";
import { StudioManga } from "@/features/studio/types/studio-manga.type";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, Button, Divider, Grid, Stack, SxProps, Typography } from "@mui/material";
import Link from "next/link";
import React, { Children, useState } from "react";


function TitleGrid({children}: {children: React.ReactNode}) {
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
        <TitleGrid>
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
        </TitleGrid>
    )
}

export default function DesktopPage() {
    const dispatch = useAppDispatch()

    const manga = useAppSelector(selectManga)

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
            <TitleGrid>
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
            </TitleGrid>
            <Divider />
            <StudioList
                py={4}
            >
                {manga?.map((m) => (
                    <MangaGridRow key={m.manga.slug} manga={m.manga}/>
                ))}
            </StudioList>
        </>
    )
}
import AppPageHeader from "@/components/AppPageHeader";
import { setDrawerOpen } from "@/features/studio/states/studio-page.slice";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, Divider, Grid, IconButton, Stack, SxProps, Typography } from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { setCreateMangaDialogOpen } from "@/features/studio/states/profile/page.slice";
import React, { Children } from "react";
import { StudioManga } from "@/features/studio/types/studio-manga.type";
import MobileContainer from "@/components/MobileContainer";
import Poster from "@/components/poster/Poster";
import Link from "next/link";
import { routes, toHref } from "@/constants/routes/main.routes";
import WrappedText from "@/components/WrapperTypography";
import StudioPrivacyStatus from "@/features/studio/components/PrivacyStatus";
import { Privacy } from "@/components/PrivacySelect";
import StudioList from "@/features/studio/components/List";
import { selectManga } from "@/features/studio/states/profile/manga.slice";


function TitleStat({
    label,
    children
}: {
    label: string,
    children: React.ReactNode
}) {
    return (
        <Box>
            <Typography 
                fontWeight={600}
                mb={1}
            >
                {label}
            </Typography>
            <Box>
                {Children.map(children, c=>c)}
            </Box>
        </Box>
    )
}

function TitleGrid({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <Grid
            container
            columns={6}
            spacing={3}
        >
            {Children.map(children, c=> c)}
        </Grid>
    )
}

function TitleGridRow({manga}: {manga: StudioManga}) {
    return (
        <TitleGrid>
            <Grid size={6}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
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
                            lines={3}
                            variant="caption"
                            color="textSecondary"
                        >
                            {manga.description}
                        </WrappedText>
                    </Box>
                </Box>    
            </Grid>
            <Grid size={2}>
                <TitleStat
                    label="Доступ"
                >
                    <StudioPrivacyStatus 
                        privacy={manga.privacy.id as Privacy}
                    />
                </TitleStat>
            </Grid>
            <Grid size={2}>
                <TitleStat
                    label="Модерация"
                >
                    <Typography>{manga.moderation_status.status_type.name}</Typography>
                </TitleStat>
            </Grid>
            <Grid size={2}>
                <TitleStat
                    label="Комментарии"
                >
                    <Typography>{manga.stats.comments}</Typography>
                </TitleStat>
            </Grid>
            <Grid size={2}>
                <TitleStat
                    label="Просмотры"
                >
                    <Typography>{manga.stats.views}</Typography>   
                </TitleStat> 
            </Grid>  
        </TitleGrid>
    )
}

export default function MobilePage() {
    const dispatch = useAppDispatch()

    const manga = useAppSelector(selectManga)

    return (
        <>
            <AppPageHeader 
                startAdornment={
                    <IconButton
                        onClick={() => dispatch(setDrawerOpen(true))}
                    >
                        <MenuRoundedIcon />
                    </IconButton>
                }
                endAdornment={
                    <IconButton onClick={() => dispatch(setCreateMangaDialogOpen(true))}>
                        <AddRoundedIcon />
                    </IconButton>
                }
                label="Тайтлы"
            />
            <MobileContainer>
                <StudioList>
                    {manga.map(m => (
                        <TitleGridRow manga={m.manga} key={m.manga.slug}/>
                    ))}
                </StudioList>
            </MobileContainer>
        </>
    )
}
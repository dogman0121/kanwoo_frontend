import { Entity } from "@/lib/types/Entity.type";
import { Box, Grid, Typography } from "@mui/material";
import { Children } from "react";
import { StudioTranslation } from "../types/studio-translation.type";
import Poster from "@/components/poster/Poster";
import Link from "next/link";
import { routes, toHref } from "@/constants/routes/main.routes";
import { Privacy } from "@/components/PrivacySelect";
import StudioPrivacyStatus from "./ui/PrivacyStatus";
import { TranslationContext } from "@/features/translations/types";

export function TranslationGrid({children}: {children: React.ReactNode}) {
    return (
        <Box
            sx={{
                px: 5,
                py: 1
            }}
        >
            <Grid
                container
                columns={12}
                spacing={3}
                alignItems={"center"}
            >
                {Children.map(children, c => c)}
            </Grid>
        </Box>
    )
}

export function TranslationHeader() {
    return (
        <TranslationGrid>
            <Grid size={6}>
                <Typography variant="caption">Название</Typography>
            </Grid>
            <Grid size={2}>
                <Typography variant="caption">Доступ</Typography>
            </Grid>
            <Grid size={2}>
                <Typography variant="caption">Язык</Typography>
            </Grid>
            <Grid size={2}>
                <Typography variant="caption">Кол-во глав</Typography>
            </Grid>
        </TranslationGrid>
    )
}

export default function TranslationRow({translationEntity}: {translationEntity: Entity<StudioTranslation, TranslationContext>}){ 

    return (
        <TranslationGrid>
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
                    {translationEntity.context?.manga && (
                        <Poster 
                            width="80px"
                            src={translationEntity.context?.manga?.poster?.medium}
                        />
                    )}
                    <Link href={toHref(routes.studio.translations.item, {id: translationEntity.data.id.toString()})}>
                        <Typography
                            variant="h3"
                            sx={{
                                "&:hover": {
                                    textDecoration: "underline"
                                }
                            }}
                        >
                            {translationEntity.data.name}
                        </Typography>
                    </Link>
                </Box>
            </Grid>
            <Grid size={2}>
                <StudioPrivacyStatus privacy={translationEntity.data.privacy.id as Privacy}/>
            </Grid>
            <Grid size={2}>
                <Typography>{translationEntity.data.lang.name}</Typography>
            </Grid>
            <Grid size={2}>
                <Typography>{translationEntity.data.chapters_count}</Typography>
            </Grid>            
        </TranslationGrid>
    )
}
"use client"

import { useAppSelector } from "@/lib/state/hooks";
import theme from "@/theme";
import { Box, Breadcrumbs, Typography } from "@mui/material";

export default function NameTranslations() {
    const nameTranlations = useAppSelector(state => state.manga.manga?.name_translations);

    if (!nameTranlations?.length)
        return null;

    return (
        <Box
            sx={{

            }}
        >
            <Typography
                sx={{
                    fontWeight: "600",
                    fontSize: "16px"
                }}
            >Другие названия</Typography>
            <Breadcrumbs sx={{mt: theme.spacing(1)}}>
                {nameTranlations?.map(name => <Typography lineHeight={"16px"} variant="caption" fontSize={"14px"} key={name.lang}>{name.name}</Typography>)}
            </Breadcrumbs>

        </Box>
    )
}
"use client"

import { useAppSelector } from "@/lib/state/hooks";
import theme from "@/constants/themes/main.theme";
import Language from "@/types/language";
import { Box, BoxProps, Breadcrumbs, Typography } from "@mui/material";
import { NameTranslation } from "@/types/manga/manga";

export default function NameTranslations({
    nameTranslations, 
    ...props
}: {
    nameTranslations: NameTranslation[],
} & BoxProps) {

    if (!nameTranslations?.length)
        return null;

    return (
        <Box
            {...props}
        >
            <Typography variant="h3">Другие названия</Typography>
            <Breadcrumbs sx={{mt: theme.spacing(1)}}>
                {nameTranslations?.map((name: {lang: Language, name: string}) => (
                    <Typography 
                        sx={{
                            lineHeight: "16px",
                            fontSize: "14px"
                        }}
                        variant="caption" 
                        key={`manga_name_translaton_${name.lang.id}`}
                    >
                        {name.name}
                    </Typography>
                ))}
            </Breadcrumbs>

        </Box>
    )
}
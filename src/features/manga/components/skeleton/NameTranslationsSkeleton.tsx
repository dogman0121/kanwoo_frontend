import { Box, Breadcrumbs, Skeleton, Typography } from "@mui/material";
import { range } from "lodash";

export default function NameTranslationsSkeleton() {
    return (
        <Box>
            <Typography variant="h3">Другие названия</Typography>
            <Breadcrumbs sx={{mt: 1}}>
                {range(0, 3).map(idx => (
                    <Skeleton key={`name_translation_skeleton_${idx}`} width={"80px"}/>
                ))}
            </Breadcrumbs>

        </Box>
    )
}
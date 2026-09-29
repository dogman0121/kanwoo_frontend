import { Grid, SxProps } from "@mui/material";
import { Children } from "react";

export default function MangaGrid({
    children,
    sx
}: {
    children: React.ReactNode,
    sx?: SxProps
}) {
    return (
        <Grid
            container
            columns={{
                lg: 8,
                md: 6,
                sm: 4,
                xs: 3
            }}
            spacing={{
                md: 3,
                xs: 2
            }}
            sx={{
                ...sx
            }}
        >
            {Children.map(children, c => (
                <Grid
                    size={1}
                >
                    {c}
                </Grid>
            ))}
        </Grid>
    )
}
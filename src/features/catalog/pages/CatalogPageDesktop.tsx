"use client"

import SearchInputDesktop from "@/features/search/components/SearchInputDesktop";
import SearchProvider from "@/features/search/components/SearchProvider";
import SearchSectionSelector from "@/features/search/components/SearchSectionSelector";
import SearchList from "@/features/search/components/ui/SearchList";
import { Box, Container, Grid, Paper, Typography, useTheme } from "@mui/material";
import MangaResults from "../components/MangaResults";
import Filters from "../components/Filters";

export default function CatalogPageDesktop() {
    const theme = useTheme()

    return (
        <Container maxWidth="lg">
            <Typography 
                variant="h1"
                sx={{
                    mt: "50px",
                }}
            >
                Каталог
            </Typography>
            <SearchProvider fromSearchParams={true} processEmptyQuery={true}>
                <Grid
                    container
                    columns={10}
                    spacing={3}
                    sx={{
                        flexGrow: 1
                    }}
                >
                    <Grid size={7}>
                        <Box>
                            <SearchInputDesktop
                                fullWidth
                                sx={{
                                    bgcolor: "background.paper"
                                }}
                            />
                            <SearchSectionSelector 
                                sx={{
                                    mt: 2
                                }}
                            />
                        </Box>
                        <SearchList
                            infinity
                            sx={{
                                mt: 3,
                                pb: 4
                            }}
                        >
                            <MangaResults />
                        </SearchList>
                    </Grid>
                    <Grid size={3}>
                        <Paper
                            variant="outlined"
                            sx={{
                                borderRadius: 3,
                                position: "sticky",
                                top: `calc(54px + ${theme.spacing(4)})`,
                                px: 4,
                                pt: 3,
                                pb: 6,
                                boxShadow: "none"
                            }}
                        >
                            <Filters />
                        </Paper>
                    </Grid>
                </Grid>
            </SearchProvider>
        </Container>
    )
}
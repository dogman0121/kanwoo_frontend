"use client"

import SearchInputDesktop from "@/features/search/components/SearchInputDesktop"
import SearchProvider from "@/features/search/components/SearchProvider"
import { Box, Container, Grid, Paper, Typography } from "@mui/material"
import Filters from "./_components/Filters"
import SearchList from "@/features/search/components/SearchList"
import MangaResults from "./_components/MangaResults"
import SearchSectionSelector from "@/features/search/components/SearchSectionSelector"
import theme from "@/constants/themes/main.theme"

export default function DesktopCatalogPage() {
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
                            sx={{
                                mt: "15px"
                            }}
                        >
                            <MangaResults />
                        </SearchList>
                    </Grid>
                    <Grid size={3}>
                        <Paper
                            variant="outlined"
                            sx={{
                                borderRadius: "12px",
                                position: "sticky",
                                top: `calc(54px + ${theme.spacing(4)})`,
                                px: 4,
                                pt: 3,
                                pb: 4,
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
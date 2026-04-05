"use client"

import SearchInputDesktop from "@/features/search/components/SearchInputDesktop"
import SearchProvider from "@/features/search/components/SearchProvider"
import { Box, Container, Paper, Typography } from "@mui/material"
import Filters from "./Filters"
import SearchList from "@/features/search/components/SearchList"
import MangaResults from "./MangaResults"

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
            <SearchProvider emptyQuery={true}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "15px"
                    }}
                >
                    <Box
                        sx={{
                            width: "70%"
                        }}
                    >
                        <SearchInputDesktop
                            fullWidth
                            sx={{
                                bgcolor: "background.paper"
                            }}
                        />
                        <SearchList
                            sx={{
                                mt: "15px"
                            }}
                        >
                            <MangaResults />
                        </SearchList>
                    </Box>
                    <Paper
                        sx={{
                            borderRadius: "12px",
                            p: "15px 20px",
                            width: "30%",
                            boxShadow: "none"
                        }}
                    >
                        <Filters />
                    </Paper>
                </Box>
            </SearchProvider>
        </Container>
    )
}
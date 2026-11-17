"use client"

import SearchInputMobile from "@/features/search/components/SearchInputMobile"
import SearchProvider from "@/features/search/components/SearchProvider"
import { Box, Drawer, IconButton } from "@mui/material"
import { useState } from "react"
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded"
import SearchSectionSelector from "@/features/search/components/SearchSectionSelector"
import SearchList from "@/features/search/components/ui/SearchList"
import Filters from "../components/Filters"
import MangaResults from "../components/MangaResults"

export default function CatalogPageMobile() {
    const [filtersOpened, setFiltersOpened] = useState(false)
    
    return (
        <SearchProvider fromSearchParams={true} processEmptyQuery={true}>
            <Box
                sx={{
                    position: "sticky",
                    bgcolor: "background.default",
                    top: 0,

                    px: 2,
                    pt: 2,
                    pb: 1,
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 1,
                    zIndex: 10
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "2px"
                    }}
                >
                    <SearchInputMobile />
                    <IconButton 
                        color="inherit"
                        onClick={() => setFiltersOpened(true)}
                    >
                        <MoreVertRoundedIcon />
                    </IconButton>
                </Box>
                <SearchSectionSelector />
            </Box>
            <SearchList
                infinity
                sx={{
                    pt: 1,
                    px: 2,
                    pb: 3
                }}
            >                
                <MangaResults />
            </SearchList>
            <Drawer
                elevation={1}
                sx={{
                    ".MuiPaper-root": {
                        py: 4,
                        px: 3,
                        width: "75vw"
                    }
                }}
                anchor={"right"}
                open={filtersOpened}
                onClose={() => setFiltersOpened(false)}
            >
                <Filters />
            </Drawer>
        </SearchProvider>
    )
}
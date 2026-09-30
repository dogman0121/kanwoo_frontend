"use client"

import SearchInputMobile from "@/features/search/components/SearchInputMobile";
import { Box, Divider, Drawer, IconButton } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded"
import Filters from "./_components/Filters";
import { useState } from "react";
import SearchList from "@/features/search/components/SearchList";
import MangaResults from "./_components/MangaResults";
import SearchProvider from "@/features/search/components/SearchProvider";
import SearchSectionSelector from "@/features/search/components/SearchSectionSelector";

export default function MobilePage() {
    const [filtersOpened, setFiltersOpened] = useState(false)

    return (
        <SearchProvider fromSearchParams={true} processEmptyQuery={true}>
            <Box
                sx={{
                    position: "sticky",
                    bgcolor: "background.default",
                    top: 0,

                    p: "10px",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 1,
                    zIndex: 1001
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
            <SearchList>                
                <MangaResults 
                    sx={{
                        px: 2,
                        pb: 3
                    }}
                />
            </SearchList>
            <Drawer
                elevation={1}
                sx={{
                    ".MuiPaper-root": {
                        p: "20px 15px",
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
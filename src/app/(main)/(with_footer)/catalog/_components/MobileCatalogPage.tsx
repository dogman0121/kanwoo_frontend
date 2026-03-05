"use client"

import SearchInputMobile from "@/features/search/components/SearchInputMobile";
import { Box, Divider, Drawer, IconButton } from "@mui/material";
import WestRoundedIcon from "@mui/icons-material/WestRounded"
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded"
import Filters from "./Filters";
import { useState } from "react";
import SearchList from "@/features/search/components/SearchList";
import MangaResults from "./MangaResults";
import SearchProvider from "@/features/search/components/SearchProvider";

export default function MobileCatalogPage() {
    const [filtersOpened, setFiltersOpened] = useState(false)

    return (
        <SearchProvider emptyQuery={true}>
            <Box
                sx={{
                    p: "10px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "2px"
                }}
            >
                <SearchInputMobile/>
                <IconButton 
                    color="inherit"
                    onClick={() => setFiltersOpened(true)}
                >
                    <MoreVertRoundedIcon />
                </IconButton>
            </Box>
            <Divider />
            <SearchList>
                <Box
                    sx={{
                        p: "15px 10px"
                    }}
                >
                    <MangaResults />
                </Box>
            </SearchList>
            <Drawer
                elevation={0}
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
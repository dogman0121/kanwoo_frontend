"use client"

import SiteLogo from "@/components/SiteLogo"
import { AppBar, IconButton, Toolbar } from "@mui/material"
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Box } from "@mui/system"
import { useAppDispatch } from "@/lib/state/hooks";
import { setSearchModalOpen } from "@/features/global/states/app/slice";
import { HomePageMap } from "../types/hero";
import HomeBlock from "../components/HomeBlock";
import Footer from "@/app/(default-layout)/_layouts/Footer";
import { useEffect } from "react";
import useBlockLoader from "../hooks/use-block-loader";
import { initializeMap } from "../states/home-page/slice";

function Header() {
    const dispatch = useAppDispatch()

    return (
        <AppBar color="header">
            <Toolbar>
                <Box
                    sx={{
                        width: "100%",

                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <SiteLogo />
                    <IconButton
                        onClick={() => dispatch(setSearchModalOpen(true))}
                    >
                        <SearchRoundedIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default function HomePageMobile({map}: {map: HomePageMap}) {
    const dispatch = useAppDispatch()

    const { loadBlock } = useBlockLoader()
    
    useEffect(() => {
        dispatch(initializeMap({map: map}))
    }, [])
    return (
        <>
            <Header />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4
                }}
            >
                {map.map(item => (
                    <HomeBlock 
                        onLoad={() => {
                            loadBlock(item.hash)
                        }}
                        item={item} 
                        key={`home_page_${item.hash}`}
                    />
                ))}
            </Box>
            <Footer />
        </>
    )
}
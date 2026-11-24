"use client"

import { Box } from "@mui/material";
import { HomePageMap } from "../types/hero";
import Footer from "@/app/(default-layout)/_layouts/Footer";
import HomeBlock from "../components/HomeBlock";
import useBlockLoader from "../hooks/use-block-loader";
import { useAppDispatch } from "@/lib/state/hooks";
import { useEffect, useRef } from "react";
import { initializeMap } from "../states/home-page/slice";

export default function HomePageDesktop({
    map
}: {map: HomePageMap}) {

    const dispatch = useAppDispatch()

    const { loadBlock } = useBlockLoader()

    useEffect(() => {
        dispatch(initializeMap({map: map}))
    }, [])

    return (
        <>
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
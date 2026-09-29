"use client"

import Footer from "./_layouts/Footer"
import { Box } from "@mui/material"
import { range } from "lodash"
import HomeBlock from "@/features/home/components/HomeBlock"
import InfinityPageSentinel from "@/features/home/components/InfinityPageSentinel"
import { HomeMap } from "@/features/home/types/hero"
import { useState } from "react"

export default function PPage({
    homeMap,
}: {
    homeMap: HomeMap
}) {

    const [visibleBlocksCount, setVisibleBlocksCount] = useState(0)

    const handleLoad = () => {
        setVisibleBlocksCount(prev => Math.min(prev + 5, homeMap.length))
    }

    return (
        <>
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: 'center',
                width: "100%",
                height: "100%",

                gap: 4
            }}
        >   
            {range(0, visibleBlocksCount).map((ind) => (
                <HomeBlock 
                    key={`home_page_block_${homeMap[ind].hash || homeMap[ind].type}`}
                    item={homeMap[ind]}
                />
            ))}
            {visibleBlocksCount < homeMap.length && (
                <InfinityPageSentinel
                    onLoadNext={handleLoad}
                />
            )}
        </Box>
        <Footer />
        </>
    )
}
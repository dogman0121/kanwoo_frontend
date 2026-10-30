"use client"

import DesktopHeroSlider from "@/features/home/components/sliders/hero/DesktopHeroSlider"
import MobileHeroSlider from "@/features/home/components/sliders/hero/MobileHeroSlider"
import { selectDeviceType } from "@/features/global/states/app/slice"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import HeroBlock from "@/types/home/heroBlock"
import { RefObject, useEffect } from "react"
import { selectBlockByHash } from "@/features/home/states/home-page/slice"
import DesktopHeroSliderSkeleton from "./skeleton/HeroSkeletonDesktop"
import MobileHeroSliderSkeleton from "./skeleton/HeroSkeletonMobile"
import { Box } from "@mui/material"


export default function HeroSlider({
    hash,
    ref
}: {
    hash: string,
    ref?: RefObject<HTMLDivElement | null>
}) {
    const deviceType = useAppSelector(selectDeviceType)

    const block = useAppSelector((state) => selectBlockByHash(state, hash))

    if (block?.status != "loaded") {
        return (
            <Box ref={ref}>
                {deviceType == "desktop" && (
                    <DesktopHeroSliderSkeleton />
                )}
                {deviceType != "desktop" && (
                    <MobileHeroSliderSkeleton />
                )}
            </Box>
        )
    }
    
    return (
        <Box ref={ref}>
            {deviceType == "desktop" && (
                <DesktopHeroSlider slides={block.data as HeroBlock[]}/>
            )}
            {deviceType != "desktop" && (
                <MobileHeroSlider slides={block.data as HeroBlock[]}/>
            )}
        </Box>
    )
}
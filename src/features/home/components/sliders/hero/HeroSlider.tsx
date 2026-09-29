"use client"

import DesktopHeroSlider from "@/features/home/components/sliders/hero/DesktopHeroSlider"
import MobileHeroSlider from "@/features/home/components/sliders/hero/MobileHeroSlider"
import { selectDeviceType } from "@/features/global/states/app/slice"
import { useAppSelector } from "@/lib/state/hooks"
import MobileHeroSliderSkeleton from "./MobileHeroSliderSkeleton"
import DesktopHeroSliderSkeleton from "./DesktopHeroSliderSkeleton"
import useBlockLoader from "@/features/home/hooks/use-block-loader"
import { HomeMapItem } from "@/features/home/types/hero"
import HeroBlock from "@/types/home/heroBlock"


export default function HeroSlider({
    item
}: {
    item: HomeMapItem
}) {
    const deviceType = useAppSelector(selectDeviceType)

    const {data, loaded} = useBlockLoader(item)

    if (!loaded) {
        return (
            <>
                {deviceType == "desktop" ?
                    <DesktopHeroSliderSkeleton />
                    :
                    <MobileHeroSliderSkeleton />
                }
            </>
        )
    }
    
    return (
        <>
            {deviceType == "desktop" && (
                <DesktopHeroSlider slides={data as HeroBlock[]}/>
            )}
            {deviceType != "desktop" && (
                <MobileHeroSlider slides={data as HeroBlock[]} />
            )}
        </>
    )
}
"use client"

import { useAppSelector } from "@/lib/state/hooks";
import { Container } from "@mui/material";
import { Suspense } from "react";
import DesktopHeroSliderSkeleton from "./_components/skeleton/DesktopHeroSliderSkeleton";
import HeroSliderDesktop from "./_components/DesktopHeroSlider";
import MangaCarouselSkeleton from "./_components/skeleton/MangaCarouselSkeleton";
import EndedManga from "./_components/sliders/EndedManga";
import NewestManga from "./_components/sliders/NewestManga";
import MostViewedManga from "./_components/sliders/MostViewedManga";
import ReadingProgresss from "./_components/sliders/ReadingProgress";

export default function DesktopHomePage() {

    return (
        <>
            <Suspense fallback={<DesktopHeroSliderSkeleton />}>
                <HeroSliderDesktop />
            </Suspense>
            <Container 
                sx={{
                    mt : "25px",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "20px"
                }}
                maxWidth="lg"
            >
                <ReadingProgresss />
                <Suspense fallback={<MangaCarouselSkeleton />}>
                    <NewestManga />
                </Suspense>
                <Suspense fallback={<MangaCarouselSkeleton />}>
                    <MostViewedManga />
                </Suspense>
                <Suspense fallback={<MangaCarouselSkeleton />}>
                    <EndedManga />
                </Suspense>
            </Container>
        </>
    )

}
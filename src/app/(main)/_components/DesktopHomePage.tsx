"use client"

import { useAppSelector } from "@/lib/state/hooks";
import { Container } from "@mui/material";
import { Suspense } from "react";
import DesktopHeroSliderSkeleton from "./DesktopHeroSliderSkeleton";
import HeroSliderDesktop from "./DesktopHeroSlider";
import MangaCarouselTitle from "../_features/MangaCarousel/MangaCarouselTitle";
import MangaCarousel from "../_features/MangaCarousel/MangaCarousel";
import MangaCarouselList from "../_features/MangaCarousel/MangaCarouselLIst";
import MangaCarouselSkeleton from "./MangaCarouselSkeleton";

export default function DesktopHomePage() {
    const home = useAppSelector(state => state.homePage.home)

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
                <Suspense fallback={<MangaCarouselSkeleton />}>
                    <MangaCarousel>
                        <MangaCarouselTitle>Новые</MangaCarouselTitle>
                        <MangaCarouselList mangaList={home?.newest || []}/>
                    </MangaCarousel>
                </Suspense>
                <Suspense fallback={<MangaCarouselSkeleton />}>
                    <MangaCarousel>
                        <MangaCarouselTitle>Завершенные</MangaCarouselTitle>
                        <MangaCarouselList mangaList={home?.ended || []}/>
                    </MangaCarousel>
                </Suspense>
                <Suspense fallback={<MangaCarouselSkeleton />}>
                    <MangaCarousel>
                        <MangaCarouselTitle>Рандомные</MangaCarouselTitle>
                        <MangaCarouselList mangaList={home?.random || []}/>
                    </MangaCarousel>
                </Suspense>
            </Container>
        </>
    )

}
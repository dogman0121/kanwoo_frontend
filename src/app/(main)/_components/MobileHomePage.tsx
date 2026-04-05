"use client"

import { Container, IconButton, SvgIcon, useTheme } from "@mui/material";
import { Suspense, useState } from "react";
import MobileHeroSlider from "./MobileHeroSlider";
import MobileHeroSliderSkeleton from "./MobileHeroSliderSkeleton";
import MangaCarouselSkeleton from "./MangaCarouselSkeleton";
import MangaCarousel from "../_features/MangaCarousel/MangaCarousel";
import MangaCarouselTitle from "../_features/MangaCarousel/MangaCarouselTitle";
import MangaCarouselList from "../_features/MangaCarousel/MangaCarouselLIst";
import { useAppSelector } from "@/lib/state/hooks";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import MobileSearchModal from "@/features/search/components/MobileSearchModal";

export default function MobileHomePage() {
    const theme = useTheme()

    const home = useAppSelector(state => state.homePage.home)

    const [searchOpen, setSearchOpen] = useState(false)

    return (
        <>
            <Container
                sx={[
                    {
                        py: "7px",

                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    },
                    theme.applyStyles("dark", {
                        backgroundColor: "#06090E"
                    }),
                    theme.applyStyles("light", {
                        backgroundColor: "#FFF1AA"
                    })
                ]}
            >
                <SvgIcon 
                    viewBox="0 0 96 96"
                    sx={{
                        width: "32px",
                        height: "32px",
                        color: theme.typography.body1.color
                    }}
                >
                    <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
                        fill={theme.typography.body1.color} stroke="none">
                        <path d="M135 888 c-3 -7 -4 -195 -3 -418 l3 -405 85 0 85 0 3 131 3 130 43
                        43 44 43 127 -176 127 -176 84 0 c69 0 84 3 84 16 0 8 -72 115 -160 236 l-161
                        221 29 31 c133 143 282 318 277 326 -3 6 -46 10 -94 10 l-87 0 -155 -171 -154
                        -171 -5 169 -5 168 -83 3 c-60 2 -84 -1 -87 -10z"/>
                    </g>
                </SvgIcon>

                <IconButton 
                    color="inherit"
                    onClick={() => setSearchOpen(true)}
                >
                    <SearchRoundedIcon />
                </IconButton>
            </Container>
            <Suspense fallback={<MobileHeroSliderSkeleton />}>
                <MobileHeroSlider />
            </Suspense>
            <Container
                sx={{
                    mt: theme.spacing(3),
                    display :"flex",
                    flexDirection: "column",
                    gap: "20px"
                }}
            >
                <Suspense fallback={<MangaCarouselSkeleton />}>
                    <MangaCarousel>
                        <MangaCarouselTitle>Новые</MangaCarouselTitle>
                        <MangaCarouselList manga={home?.newest || []}/>
                    </MangaCarousel>
                </Suspense>
                <Suspense fallback={<MangaCarouselSkeleton />}>
                    <MangaCarousel>
                        <MangaCarouselTitle>Завершенные</MangaCarouselTitle>
                        <MangaCarouselList manga={home?.ended || []}/>
                    </MangaCarousel>
                </Suspense>
                <Suspense fallback={<MangaCarouselSkeleton />}>
                    <MangaCarousel>
                        <MangaCarouselTitle>Рандомные</MangaCarouselTitle>
                        <MangaCarouselList manga={home?.random || []}/>
                    </MangaCarousel>
                </Suspense>
            </Container>
            <MobileSearchModal
                open={searchOpen}
                onClose={() => setSearchOpen(false)}
            />
        </>
    )
}
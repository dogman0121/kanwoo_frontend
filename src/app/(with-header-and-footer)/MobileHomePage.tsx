"use client"

import { Container, IconButton, SvgIcon, useTheme } from "@mui/material";
import { Suspense, useState } from "react";
import MobileHeroSlider from "./_components/MobileHeroSlider";
import MobileHeroSliderSkeleton from "./_components/skeleton/MobileHeroSliderSkeleton";
import MangaCarouselSkeleton from "./_components/skeleton/MangaCarouselSkeleton";
import { useAppSelector } from "@/lib/state/hooks";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import MobileSearchModal from "@/features/search/components/MobileSearchModal";
import MostViewedManga from "./_components/sliders/MostViewedManga";
import EndedManga from "./_components/sliders/EndedManga";
import NewestManga from "./_components/sliders/NewestManga";
import ReadingProgresss from "./_components/sliders/ReadingProgress";

export default function MobileHomePage() {
    const theme = useTheme()

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
                    gap: "20px",
                    pb: 3
                }}
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
            <MobileSearchModal
                open={searchOpen}
                onClose={() => setSearchOpen(false)}
            />
        </>
    )
}
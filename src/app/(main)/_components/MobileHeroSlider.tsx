"use client"

import { useAppSelector } from "@/lib/state/hooks";
import { Box, Button, useTheme } from "@mui/material";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./slider.css"
import { v4 } from "uuid";
import HeroBlock from "@/types/home/heroBlock";
import { useRouter } from "next/navigation";
import Image from "next/image";

function HeroManga({manga}: {manga: HeroBlock}) {
    const theme = useTheme()
    
    const router = useRouter();

    return (
        <Box>
            <Box
                sx={{
                    position: "relative",
                    maxWidth: "100vw",
                    aspectRatio: "5/4",

                    boxSizing: "border-box",

                    p: "10px 10px 0",
                    
                    display: "flex",
                    flexDirection: "column",

                    background: `
                        linear-gradient(
                            rgba(${theme.vars?.palette.background.defaultChannel} / 0.2), 
                            rgba(${theme.vars?.palette.background.defaultChannel} / 1)), 
                        url('${manga.data.background}')
                    `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundPositionY: "0"
                }}
            >
                <img
                    alt="manga_logo" 
                    style={{
                        margin: "0 auto",
                        maxWidth: "100%",
                        maxHeight: "100%"
                    }}
                    src={manga.data.logo}
                    />

                <img
                    alt="manga_name" 
                    src={manga.data.name}
                    style={{
                        position: "absolute",
                        bottom: "5px",
                        right: "50%",
                        width: "80%",
                        transform: "translateX(50%)"
                    }} 
                />  
            </Box>
            <Box
                sx={{
                    px: "10px"
                }}
            >
                <Button 
                    variant="contained"
                    sx={{
                        width: "100%",
                        height: "100%"
                    }}
                    onClick={() => router.push(`/manga/${manga.data.slug}`)}
                >
                    Читать
                </Button>
            </Box>
        </Box>
    )
}

export default function MobileHeroSlider() {
    const theme = useTheme()

    const slides = useAppSelector(state => state.homePage.home?.hero)

    return (
        <Box
            sx={{
                position: "relative",
                maxWidth: "100vw",

                "& .swiper-pagination-bullets": {
                    width: "100%",
                    bottom: "0",
                },

                "& .swiper-pagination-bullet": {
                    bgcolor: `${theme.palette.secondary.main}`,
                    opacity: "1",
                    width: "25px",
                    height: "8px",
                    borderRadius: "8px" 
                },
                "& .swiper-pagination-bullet-active": {
                    bgcolor: theme.palette.primary.main,
                    width: "40px"
                },
            }}
        >
            <Swiper
                style={{ 
                    height: "100%", 
                    paddingBottom: "30px"
                }}
                modules={[Navigation, EffectFade, Pagination, Autoplay]}
                pagination={{ clickable: true }}
                speed={800}
                effect={"fade"}
                loop
                allowTouchMove={false}
                autoplay={{ delay: 5000 }}
            >
                {slides?.slice(0, 5).map((slice) => (
                    <SwiperSlide key={`hero_${slice.type}_${v4()}`}>
                        <HeroManga manga={slice}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    )
}
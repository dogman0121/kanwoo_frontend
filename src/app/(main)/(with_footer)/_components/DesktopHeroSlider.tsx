"use client"

import { useAppSelector } from "@/lib/state/hooks"
import { Box } from "@mui/material"
import { Swiper, SwiperSlide } from 'swiper/react';
import "./slider.css"

import { Navigation, EffectFade, Autoplay, Pagination } from 'swiper/modules';
import { Vibrant } from "node-vibrant/browser";
import HeroBlock from "@/types/home/heroBlock";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import Image from "next/image";

function HeroManga({manga}: {manga: HeroBlock}) {
    const [mainColor, setMainColor] = useState<number[] | null>(null);

    useEffect(() => {
        Vibrant.from(manga.data.background).getPalette().then((palette) => {
            setMainColor(palette.Vibrant?.rgb || null)
        });
    }, [manga.data.background])

    return (
        <Box
            sx={{
                position: "relative",
                height: "100%"
            }}
        >
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    background: `url('${manga.data.background}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundPositionY: "0"
                }}
            >
                <img alt="Logo" src={manga.data.logo} style={{padding: "20px 0 0"}}/>
            </Box>
            <Box
                sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    background: `
                        linear-gradient(rgba(0, 0, 0, 0) 60%, rgba(${mainColor?.[0]}, ${mainColor?.[1]}, ${mainColor?.[2]}, 0.8) 100%)
                    `,
                    width: "100%",
                    height: "100%"
                }}
            >
            </Box>  
            <img
                alt=""
                src={manga.data.name} 
                style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    bottom: "20px",
                    maxHeight: "50%"
                }}
            />
        </Box>
              
    )
}


export default function DesktopHeroSlider() {
    const slides = useAppSelector(state => state.homePage.home?.hero)

    return (
        <Box
            sx={(theme) => ({
                position: "relative",
                width :"100%",
                aspectRatio: "3/1",
                
                "& .swiper-pagination-bullets": {
                    display: "flex",
                    justifyContent: "end",
                    bottom: "10%",
                    left: "auto",
                    right: "10%"
                },

                "& .swiper-pagination-bullet": {
                    bgcolor: `${theme.vars?.palette.secondary.main}`,
                    opacity: "1",
                    width: "25px",
                    height: "8px",
                    borderRadius: "8px" 
                },
                "& .swiper-pagination-bullet-active": {
                    bgcolor: theme.vars?.palette.primary.main,
                    width: "40px"
                },
            })}
        >
            <Swiper
                style={{ height: "100%" }}
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
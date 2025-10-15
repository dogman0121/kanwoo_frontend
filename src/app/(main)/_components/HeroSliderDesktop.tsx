import { useAppSelector } from "@/lib/state/hooks"
import { Box, Button, Typography } from "@mui/material"
import { Swiper, SwiperSlide } from 'swiper/react';
import "./slider.css"

import { Navigation, EffectFade, Autoplay, Pagination } from 'swiper/modules';
import Manga from "@/types/manga";
import theme from "@/theme";
import Poster from "@/components/Poster";
import Link from "next/link";

function HeroManga({manga}: {manga: Manga}) {
    return (
        <Box
            sx={(theme) => ({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: `
                    linear-gradient(
                    rgba(${theme.vars?.palette.background.defaultChannel} / 0.8), 
                    rgba(${theme.vars?.palette.background.defaultChannel} / 0.8)
                    ),
                    url(${manga.background ? manga.background : manga.main_poster?.large})
                `,
                backgroundSize: 'cover',
                backgroundPositionX: 'center',
                backgroundRepeat: 'no-repeat',
            })}
        >
            <Box
                sx={{
                    transform: "translateY(10px)",
                    maxWidth: "860px",
                    mx: "auto",

                    display: "flex",
                    flexDirection: "row",
                    gap: "50px",
                    alignItems: "center"
                }}
            >
                <Poster 
                    src={manga.main_poster?.medium || ""}
                    style={{
                        maxWidth: "200px"
                    }}
                />
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: theme.spacing(2)
                        }}
                    >
                        <Typography 
                            fontSize={"16px"}
                            variant="caption"
                        >
                            {manga.type?.name}
                        </Typography>
                        <Typography 
                            fontSize={"16px"}
                            variant="caption"
                        >
                            {manga.year}
                        </Typography>
                    </Box>
                    <Typography
                        fontSize={"24px"}
                        fontWeight={600}
                        lineHeight={"1"}
                    >
                        {manga.name}
                    </Typography>
                    <Typography
                        fontSize={"16px"}
                        lineHeight={"1.5"}
                        sx={{
                            mt: theme.spacing(4),
                            height: "7.5em",
                            display: "-webkit-box",
                            WebkitLineClamp: "5",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {manga.description}
                    </Typography>
                    <Link
                        href={`/manga/${manga.slug}`}
                        style={{
                            marginTop: theme.spacing(3)
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                mt: theme.spacing(3),
                                width: "150px",
                                height: "45px"
                            }}
                        >
                            Читать
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}


export default function HeroSliderDesktop() {
    const slides = useAppSelector(state => state.home.home?.hero)
    
    return (
        <Box
            sx={(theme) => ({
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
                style={{
                    borderRadius: "16px",
                    aspectRatio: "2/1",
                    width: "100%"
                }}
                modules={[Navigation, EffectFade, Pagination, Autoplay]}
                pagination={{
                    clickable: true
                }}
                speed={800}
                effect={"fade"}
                loop
                allowTouchMove={false}
                autoplay={{
                    delay: 5000
                }}
            >
                {slides?.slice(0, 5).map((slice) => (
                    <SwiperSlide key={`hero_${slice.slug}`}><HeroManga manga={slice}/></SwiperSlide>
                ))}
            </Swiper>
        </Box>
    )
}
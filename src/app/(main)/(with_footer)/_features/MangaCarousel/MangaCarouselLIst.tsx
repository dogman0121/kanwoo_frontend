import { Swiper, SwiperSlide } from "swiper/react";
import "../../_components/slider.css"
import { v4 } from "uuid";
import { MangaItemSquare } from "@/components/MangaItem";
import { Scrollbar } from "swiper/modules";
import Manga from "@/types/manga/manga";

export default function MangaCarouselList({manga}: {manga: Manga[]}) {
    return (
        <Swiper
            modules={[Scrollbar]}
            spaceBetween={15}
            draggable={true}
            breakpoints={{
                0: { slidesPerView: 3 },
                640: { slidesPerView: 4 },
                768: { slidesPerView: 6 },
                1024: { slidesPerView: 7 },
                
            }}
            style={{
                width: "100%",
            }}
        >
            {manga.map(m => (
                <SwiperSlide key={`manga_carousel_slide_${v4()}`}>
                    <MangaItemSquare 
                        manga={m} 
                        sx={{
                            width: "100%"
                        }}
                    /> 
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
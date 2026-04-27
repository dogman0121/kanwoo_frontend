import { Swiper, SwiperSlide } from "swiper/react";
import { v4 } from "uuid";
import { MangaItemSquare } from "@/components/MangaItem";
import { Scrollbar, Mousewheel } from "swiper/modules";
import Manga from "@/types/manga/manga";
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/mousewheel"

export default function MangaCarouselList({mangaList}: {mangaList: Manga[]}) {
    return (
        <Swiper
            modules={[Mousewheel]}
            spaceBetween={15}
            mousewheel={{
                enabled: true,
                forceToAxis: true
            }}
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
            {mangaList.map(manga => (
                <SwiperSlide key={`manga_carousel_slide_${v4()}`}>
                    <MangaItemSquare 
                        manga={manga} 
                        sx={{
                            width: "100%"
                        }}
                    /> 
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
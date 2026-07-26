import { Swiper, SwiperSlide } from "swiper/react";
import { v4 } from "uuid";
import { MangaItemSquare } from "@/components/MangaItem";
import { FreeMode, Navigation } from "swiper/modules";
import Manga from "@/types/manga/manga";
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/mousewheel"
import "swiper/css/navigation"
import { useRef } from "react";
import { Swiper as SwiperType } from "swiper/types";

type Props = {
    mangaList: Manga[],
    prevButton: HTMLElement | null,
    nextButton: HTMLElement | null
}

export default function MangaCarouselList({
    mangaList,
    prevButton,
    nextButton
}: Props) {

    return (
        <Swiper
            modules={[FreeMode, Navigation]}
            spaceBetween={15}
            navigation={{
                enabled: true,
                nextEl: nextButton,
                prevEl: prevButton,
                disabledClass: "Mui-disabled"
            }}
            draggable={true}
            breakpoints={{
                0: { slidesPerView: 3 },
                640: { slidesPerView: 6 },
                768: { slidesPerView: 7 },
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
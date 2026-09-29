import { Swiper, SwiperSlide } from "swiper/react";
import { v4 } from "uuid";
import { MangaItemSquare } from "@/components/manga/MangaItem";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/mousewheel"
import "swiper/css/navigation"
import { Manga, MangaShort } from "@/types/manga";
import { Children, RefObject } from "react";

type Props = {
    prevButtonRef: RefObject<HTMLElement | null>,
    nextButtonRef: RefObject<HTMLElement | null>,
    children?: React.ReactNode
}

export default function MangaCarouselList({
    children,
    prevButtonRef,
    nextButtonRef
}: Props) {

    return (
        <Swiper
            modules={[FreeMode, Navigation]}
            spaceBetween={15}
            navigation={{
                enabled: true,
                nextEl: nextButtonRef.current,
                prevEl: prevButtonRef.current,
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
            {Children.map(children, c => (
                <SwiperSlide>
                    {c}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
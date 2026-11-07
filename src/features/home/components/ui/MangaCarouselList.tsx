import { Swiper, SwiperSlide } from "swiper/react";
import { v4 } from "uuid";
import { MangaItemSquare } from "@/features/manga/components/MangaItem";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/mousewheel"
import "swiper/css/navigation"
import { Manga, MangaShort } from "@/types/manga";
import { Children, RefObject } from "react";
import { Stack } from "@mui/material";

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
            navigation={{
                enabled: true,
                nextEl: nextButtonRef.current,
                prevEl: prevButtonRef.current,
                disabledClass: "Mui-disabled"
            }}
            draggable={true}
            breakpoints={{
                0: { slidesPerView: 3.2, spaceBetween: 10 },
                640: { slidesPerView: 6.2, spaceBetween: 15 },
                768: { slidesPerView: 7.2, spaceBetween: 15 },
            }}
            style={{
                width: "100%",
            }}
        >
            <Stack
                direction="row"
                spacing={2}
            >
                {Children.map(children, c => (
                    <SwiperSlide>
                        {c}
                    </SwiperSlide>
                ))}
            </Stack>
        </Swiper>
    )
}
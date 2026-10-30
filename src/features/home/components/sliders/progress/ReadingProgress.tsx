import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { iconButtonClasses } from "@mui/material/IconButton"
import { RefObject, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/mousewheel"
import "swiper/css/navigation"
import "swiper/css/free-mode"
import AppSnackbar from "@/components/AppSnackbar";
import MangaCarousel from "../../ui/MangaCarousel";
import MangaCarouselTitle from "../../ui/MangaCarouselTitle";
import useSwitchButtons from "../../../hooks/use-switch-buttons";
import ReadingProgressItem from "./ReadingProgressItem";
import { Container, Stack } from "@mui/material";
import { selectBlockByHash } from "@/features/home/states/home-page/slice";
import { ProgressSave } from "@/features/home/types/progress";
import { range } from "lodash";
import ReadingProgressSkeleton from "./ReadingProgressSkeleton";
import { HomeProgresses } from "@/features/home/types/hero";


export default function ReadingProgresss({
    hash,
    ref
}: {
    hash: string,
    ref?: RefObject<HTMLDivElement | null>
}) {
    const {
        nextButton,
        prevButton
    } = useSwitchButtons()

    const block = useAppSelector(state => selectBlockByHash(state, hash))

    const handleDelete = (progressId: number) => {

    }

    if (block?.status == "loaded" && (!block.data || (block.data as HomeProgresses[]).length == 0))
        return null

    return (
        <Container maxWidth="lg" ref={ref}>
            <MangaCarousel>
                <MangaCarouselTitle
                    prevButtonRef={prevButton}
                    nextButtonRef={nextButton}
                >
                    Продолжить чтение
                </MangaCarouselTitle>
                <Swiper
                    modules={[FreeMode, Navigation]}
                    spaceBetween={15}
                    navigation={{
                        enabled: true,
                        nextEl: nextButton.current,
                        prevEl: prevButton.current,
                        disabledClass: iconButtonClasses.disabled
                    }}
                    draggable={true}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        600: { slidesPerView: 2 },
                        900: { slidesPerView: 3 },
                        1200: { slidesPerView: 4 }
                    }}
                    style={{
                        width: "100%",
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={2}
                    >
                    {block?.status != "loaded" ?
                        range(0, 4).map(idx => (
                            <SwiperSlide key={`home_page_reading_progress_stub_${idx}`}>
                                <ReadingProgressSkeleton/>
                            </SwiperSlide>
                        ))
                        :
                        (block.data as ProgressSave[]).map((progress, ind) => (
                            <SwiperSlide key={`home_page_progress_${progress.id}`}>
                                <ReadingProgressItem
                                    progress={progress}
                                    onDelete={() => {
                                        handleDelete(progress.id)
                                    }}
                                />
                            </SwiperSlide>
                        )) 
                    }
                    </Stack>
                </Swiper>
            </MangaCarousel>
        </Container>
    )
}
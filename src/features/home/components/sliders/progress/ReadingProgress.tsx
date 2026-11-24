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
import MangaCarousel from "../../ui/MangaCarousel";
import MangaCarouselTitle from "../../ui/MangaCarouselTitle";
import useSwitchButtons from "../../../hooks/use-switch-buttons";
import ReadingProgressItem from "./ReadingProgressItem";
import { Container, Stack } from "@mui/material";
import { selectBlockByHash } from "@/features/home/states/home-page/slice";
import { ProgressSave } from "@/features/home/types/progress";
import { range } from "lodash";
import ReadingProgressSkeleton from "./ReadingProgressSkeleton";
import { progressClientAPI } from "@/features/progress/api/client.api";


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

    const [progresses, setProgresses] = useState<ProgressSave[]>([])

    const handleDelete = async (progressID: number) => {
        await progressClientAPI.deleteProgress(progressID)

        setProgresses(prev => prev.filter(ps => ps.id != progressID))
    }

    useEffect(() => {
        if (!block?.data)
            return

        setProgresses(block.data as ProgressSave[])
    }, [block])

    if (block?.status == "loaded" && (!block.data || progresses.length == 0))
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
                        0: {
                            slidesPerView: 1.25,
                            spaceBetween: 10,
                        },
                        480: {
                            slidesPerView: 1.7,
                            spaceBetween: 12,
                        },
                        640: {
                            slidesPerView: 2.2,
                            spaceBetween: 12,
                        },
                        880: {
                            slidesPerView: 3.15,
                            spaceBetween: 16,
                        },
                        1024: {
                            slidesPerView: 3.5, // или 4, если есть кнопки навигации по краям
                            spaceBetween: 16,
                        },
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
                            range(0, 6).map(idx => (
                                <SwiperSlide key={`home_page_reading_progress_stub_${idx}`}>
                                    <ReadingProgressSkeleton/>
                                </SwiperSlide>
                            ))
                            :
                            (progresses).map((progress, ind) => (
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
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import MangaCarousel from "../../_features/MangaCarousel/MangaCarousel";
import MangaCarouselTitle from "../../_features/MangaCarousel/MangaCarouselTitle";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/mousewheel"
import "swiper/css/navigation"
import { v4 } from "uuid";
import ReadingProgressItem from "./ReadingProgressItem";
import { clientFetch } from "@/lib/fetch/clientFetch";
import { setProgresses } from "@/lib/state/features/homePage/homeSlice";
import AppSnackbar from "@/components/AppSnackbar";

export default function ReadingProgresss() {
    const dispatch = useAppDispatch()
    
    const progresses = useAppSelector(state => state.homePage.home?.progress)
    
    const prevButtonRef = useRef<HTMLButtonElement | null>(null);
    const nextButtonRef = useRef<HTMLButtonElement | null>(null);

    const [prevButton, setPrevButton] = useState<HTMLButtonElement | null>(null)
    const [nextButton, setNextButton] = useState<HTMLButtonElement | null>(null)

    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)

    useEffect(() => {
        setPrevButton(prevButtonRef.current)
        setNextButton(nextButtonRef.current)
    }, [prevButtonRef.current, nextButtonRef.current])

    const handleDelete = async (progressId: number) => {
        if (!progresses) return;

        try {
            await clientFetch.delete(`/progresses/${progressId}`)

            dispatch(setProgresses(progresses.filter((p) => p.id != progressId)))
        } catch (e) {
            setErrorSnackbarOpen(true)
            throw e
        }
    }
    
    if (!progresses || !progresses.length) return;

    return (
        <>
            <MangaCarousel>
                <MangaCarouselTitle
                    prevButtonRef={prevButtonRef}
                    nextButtonRef={nextButtonRef}
                >
                    Продолжить чтение
                </MangaCarouselTitle>
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
                        0: { slidesPerView: 2 },
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                    }}
                    style={{
                        width: "100%",
                    }}
                >
                    {progresses.map(progress => (
                        <SwiperSlide key={`manga_carousel_slide_${v4()}`}>
                            <ReadingProgressItem 
                                readingProgress={progress}
                                onDelete={handleDelete}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </MangaCarousel>
            <AppSnackbar 
                variant="error"
                message="При удалении прогресса произошла ошибка."
                open={errorSnackbarOpen}
                onClose={() => setErrorSnackbarOpen(false)}
            />
        </>
    )
}
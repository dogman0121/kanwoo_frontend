import { useAppDispatch } from "@/lib/state/hooks"
import { iconButtonClasses } from "@mui/material/IconButton"
import { useEffect, useRef, useState } from "react";
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
import { HomeMapItem, HomeProgresses } from "@/features/home/types/hero";
import { Container } from "@mui/material";
import { progressClientAPI } from "@/features/progress/api/client.api";
import { ReadingProgress, ReadingProgressContext } from "@/types/reading-progress";
import { homeClientAPI } from "@/features/home/api/client.api";


export default function ReadingProgresss({
    item
}: {
    item: HomeMapItem
}) {
    const [progresses, setProgresses] = useState<ReadingProgress[]>([])
    const [progressesContext, setProgressesContexts] = useState<ReadingProgressContext[]>([])
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)
    const loadingRef = useRef(false)
    const loadedRef = useRef(false)

    const {
        nextButton,
        prevButton
    } = useSwitchButtons()

    const handleDelete = async (progressID: number) => {
        if (!progresses) return;

        try {
            setProgresses(progresses.filter(p => p.id != progressID))
        } catch (e) {
            setErrorSnackbarOpen(true)
            throw e
        }
    }

    const fetchProgresses = async() => {
        try {
            loadingRef.current = true

            const response = await homeClientAPI.getProgresses()

            setProgresses(response.data)
            setProgressesContexts(response.context)
        } finally {
            loadingRef.current = false
            loadedRef.current = true
        }
    }

    useEffect(() => {
        if (loadedRef.current || loadingRef.current) return

        fetchProgresses()
    }, [])

    if (loadedRef.current && progresses.length == 0)
        return

    return (
        <Container maxWidth="lg">
            <MangaCarousel>
                <MangaCarouselTitle
                    prevButtonRef={prevButton}
                    nextButtonRef={nextButton}
                >
                    {item.title}
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
                    {progresses.map((progress, ind) => (
                        <SwiperSlide key={`home_page_progress_${progress.id}`}>
                            <ReadingProgressItem
                                progress={progress}
                                progressContext={progressesContext[ind]}
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
        </Container>
    )
}
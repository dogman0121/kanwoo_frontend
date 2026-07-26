"use client"

import MangaCarousel from "../../_features/MangaCarousel/MangaCarousel";
import MangaCarouselTitle from "../../_features/MangaCarousel/MangaCarouselTitle";
import { useEffect, useRef, useState } from "react";
import MangaCarouselList from "../../_features/MangaCarousel/MangaCarouselLIst";
import { useAppSelector } from "@/lib/state/hooks";

export default function MostViewedManga() {
    const mangaList = useAppSelector(state => state.homePage.home?.most_viewed)

    const prevButtonRef = useRef<HTMLButtonElement | null>(null);
    const nextButtonRef = useRef<HTMLButtonElement | null>(null);

    const [prevButton, setPrevButton] = useState<HTMLButtonElement | null>(null)
    const [nextButton, setNextButton] = useState<HTMLButtonElement | null>(null)

    useEffect(() => {
        setPrevButton(prevButtonRef.current)
        setNextButton(nextButtonRef.current)
    }, [prevButtonRef.current, nextButtonRef.current])

    if (!mangaList) return null;

    return (
        <MangaCarousel>
            <MangaCarouselTitle
                prevButtonRef={prevButtonRef}
                nextButtonRef={nextButtonRef}
            >
                Самая просматриваемая
            </MangaCarouselTitle>
            <MangaCarouselList
                mangaList={mangaList}
                prevButton={prevButton}
                nextButton={nextButton}
            />
        </MangaCarousel>
    )
}
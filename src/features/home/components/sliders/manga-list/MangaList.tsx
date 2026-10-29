"use client"

import useBlockLoader from "@/features/home/hooks/use-block-loader"
import { Container } from "@mui/material"
import MangaCarousel from "../../ui/MangaCarousel"
import MangaCarouselTitle from "../../ui/MangaCarouselTitle"
import useSwitchButtons from "@/features/home/hooks/use-switch-buttons"
import MangaCarouselList from "../../ui/MangaCarouselList"
import { MangaShort } from "@/types/manga"
import { MangaItemSquare } from "@/features/manga/components/MangaItem"
import MangaListSkeleton, { MangaSkeleton } from "./MangaListSkeleton"
import { range } from "lodash"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { useEffect } from "react"
import { selectBlockByHash } from "@/features/home/states/home-page/slice"

export default function MangaList({
    hash,
    title
}: {
    hash: string,
    title: string
}) {
    const {nextButton, prevButton} = useSwitchButtons()

    const block = useAppSelector(state => selectBlockByHash(state, hash))

    return (
        <Container maxWidth="lg">
            <MangaCarousel>
                <MangaCarouselTitle
                    prevButtonRef={prevButton}
                    nextButtonRef={nextButton}
                >
                    {title}
                </MangaCarouselTitle>
                {block?.status != "loaded" ? 
                    <MangaCarouselList
                        nextButtonRef={nextButton}
                        prevButtonRef={prevButton}
                    >
                        {range(0, 7).map((idx) => <MangaSkeleton key={`manga_carousel_item_${idx}_${Math.random()}`}/>)}
                    </MangaCarouselList>
                    :
                    <MangaCarouselList 
                        nextButtonRef={nextButton}
                        prevButtonRef={prevButton}
                    >
                        {(block.data as MangaShort[]).map(manga => (
                            <MangaItemSquare
                                key={`home_page_${hash}_${manga.id}`}
                                manga={manga}
                            />
                        ))}
                    </MangaCarouselList>
                }
            </MangaCarousel>
        </Container>
    )
}
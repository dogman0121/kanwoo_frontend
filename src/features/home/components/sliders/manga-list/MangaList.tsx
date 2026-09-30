"use client"

import useBlockLoader from "@/features/home/hooks/use-block-loader"
import { HomeMapItem } from "@/features/home/types/hero"
import { Container } from "@mui/material"
import MangaCarousel from "../../ui/MangaCarousel"
import MangaCarouselTitle from "../../ui/MangaCarouselTitle"
import useSwitchButtons from "@/features/home/hooks/use-switch-buttons"
import MangaCarouselList from "../../ui/MangaCarouselList"
import { MangaShort } from "@/types/manga"
import { MangaItemSquare } from "@/features/manga/components/MangaItem"
import MangaListSkeleton, { MangaSkeleton } from "./MangaListSkeleton"
import { range } from "lodash"

export default function MangaList({
    item
}: {
    item: HomeMapItem
}) {

    const {data, loading, loaded} = useBlockLoader(item)

    const {nextButton, prevButton} = useSwitchButtons()

    return (
        <Container maxWidth="lg">
            <MangaCarousel>
                <MangaCarouselTitle
                    prevButtonRef={prevButton}
                    nextButtonRef={nextButton}
                >
                    {item.title}
                </MangaCarouselTitle>
                {!loaded ? 
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
                        {(data as MangaShort[]).map(manga => (
                            <MangaItemSquare
                                key={`home_page_${item.type}_${item.hash}_${manga.id}`}
                                manga={manga}
                            />
                        ))}
                    </MangaCarouselList>
                }
            </MangaCarousel>
        </Container>
    )
}
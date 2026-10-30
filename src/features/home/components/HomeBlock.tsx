import { Box } from "@mui/system"
import { HomePageItem } from "../types/hero"
import HeroSlider from "./sliders/hero/HeroSlider"
import LastAddedChapters from "./sliders/last-added-chapters/LastAddedChapters"
import MangaList from "./sliders/manga-list/MangaList"
import ReadingProgresss from "./sliders/progress/ReadingProgress"
import { useEffect, useRef } from "react"

export default function HomeBlock({
    item,
    onLoad
}: {
    item: HomePageItem,
    onLoad: () => void
}) {

    const blockRef = useRef<HTMLDivElement>(null);
    const intersectionObserverRef = useRef<IntersectionObserver>(null)
    const intersectionLocked = useRef(false)
    
    const onLoadRef = useRef<() => void>(() => {})

    useEffect(() => {
        onLoadRef.current = onLoad
    }, [onLoad])

    useEffect(() => {
        if (!blockRef.current) return

        intersectionObserverRef.current = new IntersectionObserver(([entries]) => {
            if (!entries.isIntersecting)
                return intersectionLocked.current = false

            if (intersectionLocked.current) return

            intersectionLocked.current = true
            onLoadRef.current()
        }, {rootMargin: "0px 0px 200px 0px"})

        intersectionObserverRef.current.observe(blockRef.current)

        return () => {
            intersectionObserverRef.current?.disconnect()
        }
    }, [blockRef.current])

    return (
        <>
            {item.type == "hero" && (
                <HeroSlider hash={item.hash} ref={blockRef}/>
            )}
            {item.type == "reading_progresses" && (
                <ReadingProgresss hash={item.hash} ref={blockRef}/>
            )}
            {item.type == "manga_list" && (
                <MangaList title={item.title} hash={item.hash} ref={blockRef}/>
            )}
            {item.type == "last_added_chapters" && (
                <LastAddedChapters hash={item.hash} ref={blockRef}/>
            )}
        </>
    )
}
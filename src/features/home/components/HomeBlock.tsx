import { HomeBlockData, HomeMapItem } from "../types/hero"
import HeroSlider from "./sliders/hero/HeroSlider"
import LastAddedChapters from "./sliders/last-added-chapters/LastAddedChapters"
import MangaList from "./sliders/manga-list/MangaList"
import ReadingProgresss from "./sliders/progress/ReadingProgress"

export default function HomeBlock({
    item
}: {
    item: HomeMapItem,
}) {

    return (
        <>
            {item.type == "hero" && (
                <HeroSlider item={item}/>
            )}
            {item.type == "reading_progresses" && (
                <ReadingProgresss item={item}/>
            )}
            {item.type == "manga_list" && (
                <MangaList item={item}/>
            )}
            {item.type == "last_added_chapters" && (
                <LastAddedChapters item={item}/>
            )}
        </>
    )
}
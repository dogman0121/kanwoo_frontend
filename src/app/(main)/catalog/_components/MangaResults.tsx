import { MangaItemSquare } from "@/components/MangaItem";
import useSearch from "@/features/search/hooks/useSearch";
import Manga from "@/types/manga/manga";
import { Box } from "@mui/material";

export default function MangaResults() {
    const { results } = useSearch();

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "15px"
            }}
        >
            {results.map(m => (
                <MangaItemSquare manga={m as Manga} key={`catalog_manga_${m.slug}`}/>
            ))}
        </Box>
    )
}
import { useContext } from "react";
import SearchContext from "../context/SearchContext";
import { Box, SxProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchList from "./SearchList";
import Poster from "@/components/Poster";
import Manga from "@/types/manga";
import Sections from "../types/searchSection";


function MangaItem({ item }: { item: Manga }) {
    const theme = useTheme()

    return (
        <a href={`/manga/${item.slug}`}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    p: "6px 10px",
                    borderRadius: "6px",
                    bgcolor: "#313131",
                    "&:hover": {
                        bgcolor: "#393939"
                    }
                }}
            >
                <Poster 
                    src={item.main_poster?.thumbnail || ""}
                    width="50px"
                />
                <Box
                    sx={{
                        ml: "10px",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Box fontSize={"15px"}>{item.name}</Box>
                </Box>
            </Box>
        </a>
    )
}

function SearchListModal({ sx }: { sx?: SxProps }) {
    const { section, results } = useContext(SearchContext);

    return (
        <>
            <SearchList 
                className="scrollable"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "8px",
                    ...sx
                }}
            >
                {section === Sections.MANGA && (
                    <>
                        {results.slice(0, 10).map((result) => 
                            <MangaItem item={result} key={result.id}/>
                        )}
                    </>
                )} 
            </SearchList>
        </>
    )
}

export default SearchListModal;
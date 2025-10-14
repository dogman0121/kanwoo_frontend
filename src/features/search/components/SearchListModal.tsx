import { useContext } from "react";
import SearchContext from "../context/SearchContext";
import { Box, ListItem, ListItemButton, Paper, SxProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchList from "./SearchList";
import Poster from "@/components/Poster";
import Manga from "@/types/manga";
import SearchSection from "../types/searchSection";


function MangaItem({ item }: { item: Manga }) {
    return (
        <a href={`/manga/${item.slug}`}>
            <ListItemButton
                sx={(theme) => ({
                    boxShadow: "none",
                    display: "flex",
                    flexDirection: "row",
                    p: "6px 10px",
                    borderRadius: "6px",
                })}
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
            </ListItemButton>
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
                {(results.slice(0, 10) as Manga[]).map((result: Manga) => 
                    <MangaItem item={result} key={result.id}/>
                )}
            </SearchList>
        </>
    )
}

export default SearchListModal;
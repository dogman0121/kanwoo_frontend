import { useContext } from "react";
import SearchContext from "../../context/SearchContext";
import { Box, ListItemButton, SxProps, Typography } from "@mui/material";
import SearchList from "./SearchList";
import Poster from "@/components/poster/Poster";
import { Manga } from "@/types/manga";
import Link from "next/link";
import { routes, toHref } from "@/constants/routes/main.routes";
import { MangaShort } from "@/features/manga/types";


function MangaItem({ 
    item,
    onClick 
}: { 
    item: Manga,
    onClick?: () => void
}) {


    return (
        <Link href={toHref(routes.manga.item, {slug: item.slug})} style={{width: "100%"}}>
            <ListItemButton
                onClick={onClick}
                sx={(theme) => ({
                    display: "flex",
                    flexDirection: "row",

                    gap: 2
                })}
            >
                <Poster 
                    src={item.poster?.thumbnail || ""}
                    width="50px"
                />
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Typography>{item.name}</Typography>
                </Box>
            </ListItemButton>
        </Link>
    )
}

function SearchListModal({ sx, onChoose }: { 
    sx?: SxProps, 
    onChoose?: (m?: MangaShort) => void 
}) {
    const { results } = useContext(SearchContext);

    const handleChoose = (item: MangaShort) => {
        onChoose?.(item)
    }

    return (
        <>
            <SearchList 
                className="scrollable"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    ...sx
                }}
            >
                {(results.slice(0, 10) as Manga[]).map((result: Manga) => 
                    <MangaItem 
                        item={result} 
                        key={result.id}
                        onClick={() => {
                            handleChoose?.(result)
                        }}
                    />
                )}
            </SearchList>
        </>
    )
}

export default SearchListModal;
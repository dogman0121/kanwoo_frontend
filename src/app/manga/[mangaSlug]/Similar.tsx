"use client"

import Poster from "@/components/Poster";
import { useAppSelector } from "@/lib/state/hooks";
import Manga from "@/types/manga";
import { Box, Typography } from "@mui/material";

function SimilarItem({ manga }: {manga: Manga}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "10px",
                alignItems: "center"
            }}
        >
            <Poster width="60px" src={manga.main_poster?.small || ""}/>
            <Box>
                <Typography fontSize={"15px"}>{manga.name}</Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        fontSize: "14px"
                    }}
                >
                    <Typography>{manga.type?.name}</Typography>
                    <Typography>{manga.year}</Typography>
                </Box>
            </Box>
        </Box>
    )
}


export default function Similar() {
    const similar = useAppSelector(state => state.manga.similar)

    if (similar.length == 0)
        return null;

    return (
        <Box>
            <Typography fontSize={"22px"} lineHeight={1}>Похожее</Typography>
            <Box
                sx={{
                    mt: "5px"
                }}
            >
                {similar.map((manga) => <SimilarItem key={manga.id} manga={manga}/>) }
            </Box>
        </Box>
    )
}

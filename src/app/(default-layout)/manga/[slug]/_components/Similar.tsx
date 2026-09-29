"use client"

import Poster from "@/components/poster/Poster";
import { fetchSimilar, selectManga, selectSimilar } from "@/lib/state/features/manga-page/page/slice";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { MangaShort } from "@/types/manga";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

function SimilarItem({ manga }: {manga: MangaShort}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "10px",
                alignItems: "center"
            }}
        >
            <Poster width="60px" src={manga.poster?.small || ""}/>
            <Box>
                <Typography fontSize={"16px"}>{manga.name}</Typography>
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
    const dispatch = useAppDispatch()

    const manga = useAppSelector(selectManga)

    useEffect(() => {
        if (manga)
            dispatch(fetchSimilar(manga.slug))
    }, [manga])

    const similar = useAppSelector(selectSimilar)

    if (!similar)
        return null

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

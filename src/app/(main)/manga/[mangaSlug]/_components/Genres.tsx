"use client"

import { useAppSelector } from "@/lib/state/hooks"
import theme from "@/theme";
import { Box } from "@mui/material";
import Link from "next/link";

function GenreItem({genre}: {genre: {id: number, name: string}}) {
    return (
        <Link href={`/catalog?genre=${genre.id}`}>
            <Box
                sx={{
                    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
                    borderRadius: "6px",

                    bgcolor: theme.vars?.palette.secondary.main,
                    lineHeight: "1em"
                }}
            >
                {genre.name}
            </Box>
        </Link>
    )
}

export default function Genres() {
    const genres = useAppSelector(state => state.manga.manga?.genres);

    if (!genres?.length)
        return null;

    return (
        <Box
            sx={{
                display: "flex",
                
                columnGap: "5px",
                rowGap: "5px"
            }}
        >
            {genres?.map((genre) => <GenreItem key={genre.id} genre={genre} />)}
        </Box>
    )

}
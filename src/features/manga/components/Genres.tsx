"use client"

import { useAppSelector } from "@/lib/state/hooks"
import Genre from "@/types/manga/genre";
import { Box, BoxProps, Chip } from "@mui/material";
import Link from "next/link";

function GenreItem({genre}: {genre: {id: number, name: string}}) {
    return (
        <Link href={`/catalog?genre=${genre.id}`}>
            <Chip label={genre.name}
            />
        </Link>
    )
}

export default function Genres({
    genres,
    sx,
    ...props
}: {
    genres: Genre[]
} & BoxProps) {
    if (!genres?.length)
        return null;

    return (
        <Box
            sx={{
                display: "flex",
                
                columnGap: "5px",
                rowGap: "5px",
                ...sx
            }}
            {...props}
        >
            {genres?.map((genre) => <GenreItem key={genre.id} genre={genre} />)}
        </Box>
    )

}
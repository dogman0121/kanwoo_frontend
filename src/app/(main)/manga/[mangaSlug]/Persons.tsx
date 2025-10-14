"use client"

import { useAppSelector } from "@/lib/state/hooks";
import Profile from "@/types/profile";
import { Avatar, Box, Chip, styled, SxProps, Typography } from "@mui/material";
import Link from "next/link";

const MyChip = styled(Chip)(({theme}) => ({
    backgroundColor: theme.vars?.palette.secondary.main
}))

function PersonList({title, profiles}: {title: string, profiles: Profile[]}){
    if (profiles.length == 0)
        return null;

    return (
        <Box>
            <Typography fontSize={"16px"} fontWeight={600}>{title}</Typography>
            <Box 
                sx={{
                    mt: "5px",
                    display: "flex",
                    flexDirection: "row",
                    gap: "5px",
                    flexWrap: "wrap"
                }}
            >
                {profiles.map(profiles => (
                    <Link href={`/profiles/${profiles.slug}`} key={profiles.slug}>
                        <MyChip avatar={<Avatar src={profiles.avatar || ""}/>} label={profiles.name}/>
                    </Link> 
                ))}
            </Box>
        </Box>
    )
}

export default function Persons({sx}: {sx?: SxProps}) {
    const authors = useAppSelector(state => state.manga.manga?.authors);
    const artists = useAppSelector(state => state.manga.manga?.artists);
    const publishers = useAppSelector(state => state.manga.manga?.publishers);

    if (!(authors?.length || artists?.length || publishers?.length))
        return null;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "15px",
                rowGap: "5px",
                flexWrap: "wrap",
                ...sx
            }}
        >
            {authors && (
                <PersonList 
                    title="Авторы"
                    profiles={authors}
                />
            )}
            {artists && (
                <PersonList 
                    title="Художники"
                    profiles={artists}
                />
            )}
            {publishers && (
                <PersonList 
                    title="Издатели"
                    profiles={publishers}
                />
            )}
        </Box>
    )
}
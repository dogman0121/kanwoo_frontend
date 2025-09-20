import Manga from "@/types/manga";
import { Box, styled, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import Poster from "./Poster";

const TitleItemSquareText = styled(Typography)(() => ({
    lineHeight: "1.3",
    fontSize: "14px"
})) 

export interface MangaItemProps {
    manga: Manga,
    rightTopAdornment?: React.ReactElement
}

function MangaItemSquare({manga, rightTopAdornment}: MangaItemProps) {
    const theme = useTheme();

    return (
        <Box 
            className="TitleItem"
            sx={{position: "relative"}}
        >
            <Link 
                draggable={false}
                href={`/manga/${manga.slug}`}
                style={{
                    userSelect: "none"
                }}
            >
                <Poster
                    src={manga.main_poster?.small || ""} 
                    width="100%"
                />
                <Box
                    sx={{
                        mt: theme.spacing(1)
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <TitleItemSquareText>{manga.type?.name}</TitleItemSquareText>
                        <TitleItemSquareText ml={theme.spacing(1)}>{manga.year}</TitleItemSquareText>
                    </Box>
                    <TitleItemSquareText
                        sx={{
                            mt: theme.spacing(1),
                            fontSize:"14px",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {manga.name}
                    </TitleItemSquareText>
                </Box>
                {rightTopAdornment && (
                    <Box
                        sx={{
                            position: "absolute",
                            right: theme.spacing(1),
                            top: theme.spacing(1)
                        }}
                    >
                        {rightTopAdornment}
                    </Box>
                )}
            </Link>
        </Box>
    )
}

function MangaItemRect({manga}: MangaItemProps) {
    return (
        <>{manga.name}</>
    )
}

export default function MangaItem({
    manga,
    rightTopAdornment, 
    form
}: {form: "square" | "rectangle"} & MangaItemProps) {
    return (
        <>
            {form == "square" ?
                <MangaItemSquare manga={manga} rightTopAdornment={rightTopAdornment}/>
                :
                <MangaItemRect manga={manga} rightTopAdornment={rightTopAdornment}/>
            }
        </>
    )
}
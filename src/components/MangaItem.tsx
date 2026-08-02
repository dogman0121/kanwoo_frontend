import { Box, BoxProps, styled, SxProps, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import Poster from "./Poster";
import Manga from "@/types/manga/manga";
import WrappedText from "./WrapperTypography";

export interface MangaItemProps {
    manga: Manga,
    rightTopAdornment?: React.ReactElement
}

export function MangaItemSquare({manga, sx, rightTopAdornment, ...props}: MangaItemProps & BoxProps) {
    const theme = useTheme();

    return (
        <Box 
            className="TitleItem"
            sx={{
                position: "relative", 
                ...sx
            }}
            {...props}
        >
            <Link 
                draggable={false}
                href={`/manga/${manga.slug}`}
                style={{
                    userSelect: "none"
                }}
            >
                <Poster
                    src={manga.poster?.medium || ""} 
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
                        <Typography variant="caption">{manga.type?.name}</Typography>
                        <Typography variant="caption" ml={theme.spacing(1)}>{manga.year}</Typography>
                    </Box>
                    <WrappedText
                        lines={2}
                        sx={{
                            lineHeight: "1.3",
                            fontSize: "14px"
                        }}
                    >
                        {manga.name}
                    </WrappedText>
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

function MangaItemRect({manga}: MangaItemProps & BoxProps) {
    return (
        <>{manga.name}</>
    )
}

export default function MangaItem({
    manga, 
    form,
    ...props
}: {form: "square" | "rectangle"} & MangaItemProps & BoxProps) {
    return (
        <>
            {form == "square" ?
                <MangaItemSquare manga={manga} {...props}/>
                :
                <MangaItemRect manga={manga} {...props}/>
            }
        </>
    )
}
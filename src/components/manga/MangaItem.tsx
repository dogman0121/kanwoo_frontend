import { Box, BoxProps, styled, SxProps, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import Poster from "../poster/Poster";
import WrappedText from "../WrapperTypography";
import { MangaShort } from "@/types/manga";

export interface MangaItemProps {
    manga: MangaShort,
    rightTopAdornment?: React.ReactElement
}

export function MangaItemSquare({manga, sx, rightTopAdornment, ...props}: MangaItemProps & BoxProps) {
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
                        mt: 1
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <Typography variant="caption">{manga.type?.name}</Typography>
                        <Typography variant="caption" ml={1}>{manga.year}</Typography>
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
                            right: 1,
                            top: 1
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
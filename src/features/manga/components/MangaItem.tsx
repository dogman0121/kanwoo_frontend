import { Box, BoxProps, Skeleton, styled, SxProps, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import Poster from "./ui/Poster";
import WrappedText from "../../../components/WrapperTypography";
import { MangaShort } from "@/types/manga";

export interface MangaItemProps {
    manga: MangaShort,
    rightTopAdornment?: React.ReactElement
}

export function MangaItemSquareSkeleton() {
    return (
        <Box>
            <Skeleton 
                variant="rectangular"
                sx={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "2/3",
                    borderRadius: "8px"
                }}
            />
            <Box
                sx={{
                    mt: 1
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row"
                    }}
                >
                    <Typography variant="caption">
                        <Skeleton width={50}/>
                    </Typography>
                    <Typography variant="caption" sx={{
                        ml: 2
                    }}>
                        <Skeleton width={35}/>
                    </Typography>
                </Box>
                <Typography sx={{lineHeight: "1.2"}}>
                    <Skeleton />
                    <Skeleton />
                </Typography>
                <Typography>
                    
                </Typography>
            </Box>
        </Box>
    )
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
                        <Typography variant="caption" color="textSecondary">{manga.type?.name}</Typography>
                        <Typography variant="caption" color="textSecondary" sx={{ml: 2}}>{manga.year}</Typography>
                    </Box>
                    <WrappedText
                        lines={2}
                        sx={{
                            lineHeight: "1.2"
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
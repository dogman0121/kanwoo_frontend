import MangaItem, { MangaItemSquare } from "@/features/manga/components/MangaItem";
import useSearch from "@/features/search/hooks/useSearch";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, BoxProps, Breadcrumbs, Button, Drawer, IconButton, Popover, SxProps, Typography } from "@mui/material";
import Grid, { GridProps } from "@mui/material/Grid"
import { RefObject, useEffect, useRef, useState } from "react";
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded"
import Description from "@/features/manga/components/Description";
import Genres from "@/features/manga/components/Genres";
import NameTranslations from "@/features/manga/components/NameTranslations";
import theme from "@/constants/themes/main.theme";
import Poster from "@/components/poster/Poster";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import Stats from "@/features/manga/components/Stats";
import { useRouter } from "next/navigation";
import { throttle } from "lodash";
import Metadata from "@/features/manga/components/Metadata";
import { openCollectionDialog, selectDeviceType } from "@/features/global/states/app/slice";
import { Manga, MangaShort } from "@/types/manga";
import { routes, toHref } from "@/constants/routes/main.routes";
import { selectMangaBySlug } from "@/features/global/states/manga/selectors";
import { fetchManga } from "@/features/global/states/manga/slice";
import StatsSkeleton from "@/features/manga/components/skeleton/StatsSkeleton";
import DescriptionSkeleton from "@/features/manga/components/skeleton/DescriptionSkeleton";
import GenresSkeleton from "@/features/manga/components/skeleton/GenresSkeleton";
import NameTranslationsSkeleton from "@/features/manga/components/skeleton/NameTranslationsSkeleton";
import MangaGrid from "@/features/manga/components/MangaGrid";


interface MangaDetailsProps {
    shortData: MangaShort,
    open: boolean,
    onClose?: () => void,
    mangaRef?: RefObject<HTMLElement | null>,
    onFocus?: () => void,
    onBlur?: () => void
}

function MangaDetailsMobile({
    shortData,
    open,
    onClose
}: MangaDetailsProps) {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const manga = useAppSelector(state => selectMangaBySlug(state, shortData.slug))

    useEffect(() => {
        if (!open || manga) return

        //dispatch(fetchManga(shortData.slug))
    }, [open, manga])

    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor="bottom"
            sx={{
                "&>.MuiPaper-root": {
                    borderRadius: `${theme.spacing(3)} ${theme.spacing(3)} 0 0`,
                }
            }}
        >
            <Box
                sx={{
                    py: 3,
                    px: 5,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 3,
                    }}
                >
                    <Poster 
                        src={shortData.poster.small}
                        width="60px"
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <Metadata 
                            type={shortData.type}
                            year={shortData.year}
                            status={shortData.status}
                        />
                        <Typography 
                            variant="h2" 
                        >
                            {shortData.name}
                        </Typography>
                        {manga ? 
                            <Stats
                                views={manga.stats.views} 
                                saves={manga.stats.saves} 
                                size="small"
                            />
                            :
                            <StatsSkeleton size="small"/>
                        }
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    px: 2,
                    pb: 3,

                    position: "relative"
                }}
            >
               
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",  
                        rowGap: 2
                    }}
                >
                    {manga ? 
                        <Description 
                            description={manga.description}
                        />
                        :
                        <DescriptionSkeleton />
                    }
                    {manga ? 
                        <Genres 
                            genres={manga.genres}
                        />
                        :
                        <GenresSkeleton />
                    }
                    {manga ? 
                        <NameTranslations 
                            nameTranslations={manga.name_translations}
                        />
                        :
                        <NameTranslationsSkeleton />
                    }
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",

                        }}
                    >
                        <Button
                            startIcon={<BookmarkBorderRoundedIcon />}
                            variant="contained"
                            fullWidth
                            onClick={() => {
                                dispatch(openCollectionDialog({mangaUUID: shortData.slug}))
                            }}
                        >
                            Сохранить
                        </Button>
                        <IconButton onClick={() => router.push(toHref(routes.manga.item, {slug: shortData.slug}))}>
                            <OpenInNewRoundedIcon />
                        </IconButton>
                    </Box>
                </Box>

                
            </Box>
            <IconButton 
                sx={{
                    position: "absolute",
                    right: "0",
                    top: "0"
                }}
                onClick={() => onClose?.()}
            >
                <CloseRoundedIcon />
            </IconButton>
        </Drawer>
    )
}

function MangaDetailsDesktop({
    shortData,
    open,
    onClose,
    mangaRef,
    onBlur,
    onFocus
}: MangaDetailsProps) {
    const dispatch = useAppDispatch()

    const manga = useAppSelector(state => selectMangaBySlug(state, shortData.slug))

    useEffect(() => {
        if (!open || manga) return

        dispatch(fetchManga(shortData.slug))
    }, [open, manga])

    return (
        <Popover
            onPointerOver={(event) => event.stopPropagation()}
            onPointerEnter={(event) => event.stopPropagation()}
            open={open}
            disableScrollLock
            onClose={onClose}
            anchorEl={mangaRef?.current}
            sx={{
                pointerEvents: "none",
                ml: 2,
                
                "& .MuiPaper-root": {
                    pointerEvents: "auto",
                    width: "350px",

                    borderRadius: 2,

                    p: 2
                }
            }}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }} 
            transformOrigin={{
                vertical: "top",
                horizontal: "left"
            }}
            disableRestoreFocus
            disableAutoFocus
        >
            <Box
                onMouseEnter={onFocus}
                onMouseLeave={onBlur}

                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 2
                }}
            >   
                <Box>
                    <Breadcrumbs>
                        <Typography>
                            {shortData.type.name}
                        </Typography>
                        <Typography>
                            {shortData.year}
                        </Typography>
                        <Typography>
                            {shortData.status.name}
                        </Typography>
                    </Breadcrumbs>
                    <Typography 
                        variant="h2"
                    >
                        {shortData.name}
                    </Typography>
                    {manga ? 
                        <Stats
                            views={manga.stats.views} 
                            saves={manga.stats.saves} 
                            size="medium"
                        />
                        :
                        <StatsSkeleton size="medium"/>
                    }
                </Box>
                {manga ? 
                    <Description 
                        description={manga.description}
                    />
                    :
                    <DescriptionSkeleton />
                }
                {manga ? 
                    <Genres 
                        genres={manga.genres}
                    />
                    :
                    <GenresSkeleton />
                }
                {manga ? 
                    <NameTranslations 
                        nameTranslations={manga.name_translations}
                    />
                    :
                    <NameTranslationsSkeleton />
                }
                
                <Button 
                    size="small" 
                    variant="contained"
                    fullWidth
                    startIcon={<BookmarkBorderRoundedIcon />}  
                    onClick={() => {
                        dispatch(openCollectionDialog({mangaUUID: shortData.slug}))
                    }}  
                >
                        Сохранить
                </Button>
            </Box>
        </Popover>
    )
}


function MangaResult({
    manga,
    sx
}: {manga: MangaShort, sx?: SxProps}) {
    const deviceType = useAppSelector(selectDeviceType)

    const openTimoutRef = useRef<NodeJS.Timeout | null>(null);
    const mangaItemRef = useRef<HTMLElement | null>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const [mangaMenuOpen, setMangaMenuOpen] = useState(false);

    const setShowDetailsTimeout = () => {
        if (closeTimeoutRef.current)
            clearTimeout(closeTimeoutRef.current)

        openTimoutRef.current = setTimeout(() => {
            setMangaMenuOpen(true)
            openTimoutRef.current = null
        }, 300)
    }

    const cleanShowDetailsTimeout = () => {
        closeTimeoutRef.current = setTimeout(() => {
            if (openTimoutRef.current)
                clearTimeout(openTimoutRef.current)

            setMangaMenuOpen(false)
        }, 100)
    }

    const throttledCleanShowDetails = throttle(() => {
        if (!mangaMenuOpen)
            cleanShowDetailsTimeout()
    }, 50)

    useEffect(() => {
        window.addEventListener("scroll", throttledCleanShowDetails)

        return () => {window.removeEventListener("scroll", throttledCleanShowDetails)}
    }, [throttledCleanShowDetails])

    return (
        <>
            <MangaItemSquare
                aria-owns={mangaMenuOpen ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                manga={manga as Manga}
                ref={mangaItemRef}
                onContextMenu={(event) => {
                    if (deviceType != "desktop")
                        event.preventDefault()
                }}
                onMouseEnter={() => {
                    if (deviceType === "desktop")
                        setShowDetailsTimeout()
                }}
                onMouseLeave={() => {
                    if (deviceType === "desktop")
                        cleanShowDetailsTimeout()
                }}
                onPointerUp={() => {
                    if (!mangaMenuOpen)
                        cleanShowDetailsTimeout()
                }}
                onPointerDown={() => {
                    setShowDetailsTimeout()
                }}
                sx={{
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",    /* Firefox */
                    MsUserSelect: "none",    /* Internet Explorer / Edge */
                    userSelect: "none",

                    WebkitTouchCallout: "none", /* Отключает контекстное меню при долгом нажатии в iOS Safari */
                    WebkitTapHighlightColor: "transparent", /* Убирает синюю подсветку при клике на Android/iOS */
                    
                    "&:hover": {
                        transform: (deviceType != "desktop" ? "scale(1.05)" : undefined)
                    },
                    ...sx
                }}  
            />
            { deviceType == "desktop" ?
                <MangaDetailsDesktop 
                    shortData={manga}
                    open={mangaMenuOpen}
                    onClose={() => setMangaMenuOpen(false)}
                    mangaRef={mangaItemRef}
                    onFocus={() => {
                        if (closeTimeoutRef.current) {
                            clearTimeout(closeTimeoutRef.current)
                        }
                    }}
                    onBlur={() => {
                        cleanShowDetailsTimeout()
                    }}
                />
                :
                <MangaDetailsMobile 
                    shortData={manga}
                    open={mangaMenuOpen}
                    onClose={() => setMangaMenuOpen(false)}
                />
            }
        </>
    )
}

export default function MangaResults({
    sx
}: {sx?: SxProps}) {
    const { results } = useSearch();

    return (
        <Grid
            container
            columns={{
                lg: 6,
                md: 5,
                sm: 4,
                xs: 3
            }}
            spacing={{
                md: 3,
                xs: 2
            }}
            sx={{
                ...sx
            }}
        >
            {results.map(manga => (
                <Grid key={`catalog_manga_${manga.slug}`} size={1}>
                    <MangaResult 
                        manga={manga as MangaShort}
                    />
                </Grid>
            ))}
        </Grid>
    )
}
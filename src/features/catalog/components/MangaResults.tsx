"use client"

import MangaItem, { MangaItemSquare } from "@/features/manga/components/MangaItem";
import useSearch from "@/features/search/hooks/useSearch";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, BoxProps, Breadcrumbs, Button, Drawer, IconButton, Popover, SxProps, Typography } from "@mui/material";
import Grid, { GridProps } from "@mui/material/Grid"
import { MouseEvent, PointerEvent, RefObject, useEffect, useRef, useState } from "react";
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded"
import Description from "@/features/manga/components/ui/Description";
import Genres from "@/features/manga/components/ui/Genres";
import NameTranslations from "@/features/manga/components/ui/NameTranslations";
import theme from "@/constants/themes/main.theme";
import Poster from "@/features/manga/components/ui/Poster";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import Stats from "@/features/manga/components/ui/Stats";
import { useRouter } from "next/navigation";
import { throttle } from "lodash";
import Metadata from "@/features/manga/components/ui/Metadata";
import { openCollectionDialog, selectDeviceType } from "@/features/global/states/app/slice";
import { Manga, MangaShort } from "@/types/manga";
import { routes, toHref } from "@/constants/routes/main.routes";
import StatsSkeleton from "@/features/manga/components/skeleton/StatsSkeleton";
import DescriptionSkeleton from "@/features/manga/components/skeleton/DescriptionSkeleton";
import GenresSkeleton from "@/features/manga/components/skeleton/GenresSkeleton";
import NameTranslationsSkeleton from "@/features/manga/components/skeleton/NameTranslationsSkeleton";
import { selectMangaBySlug } from "@/features/manga/states/manga/selectors";
import { fetchManga } from "@/features/manga/states/manga/slice";
import BottomPanel from "@/components/BottomPanel";


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

        dispatch(fetchManga(shortData.slug))
    }, [open, manga])

    return (
        <BottomPanel
            open={open}
            onClose={onClose}
            sx={{
                "&>.MuiPaper-root": {
                    borderRadius: `${theme.spacing(3)} ${theme.spacing(3)} 0 0`,

                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    userSelect: "none",
                    WebkitTouchCallcout: "none", 
                    WebkitTapHighlightColor: "transparent" 
                }
            }}
        >
            <Box
                sx={{
                    py: 4,
                    pb: 2,
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
                        src={shortData.poster?.small}
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
                                views={manga.data.stats.views} 
                                saves={manga.data.stats.saves} 
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
                            description={manga.data.description}
                        />
                        :
                        <DescriptionSkeleton />
                    }
                    {manga ? 
                        <Genres 
                            genres={manga.data.genres}
                        />
                        :
                        <GenresSkeleton />
                    }
                    {manga ? 
                        <NameTranslations 
                            nameTranslations={manga.data.name_translations}
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
                                dispatch(openCollectionDialog({mangaId: shortData.id}))
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
        </BottomPanel>
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
                            views={manga.data.stats.views} 
                            saves={manga.data.stats.saves} 
                            size="medium"
                        />
                        :
                        <StatsSkeleton size="medium"/>
                    }
                </Box>
                {manga ? 
                    <Description 
                        description={manga.data.description}
                    />
                    :
                    <DescriptionSkeleton />
                }
                {manga ? 
                    <Genres 
                        genres={manga.data.genres}
                    />
                    :
                    <GenresSkeleton />
                }
                {manga ? 
                    <NameTranslations 
                        nameTranslations={manga.data.name_translations}
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
                        dispatch(openCollectionDialog({mangaId: shortData.id}))
                    }}  
                >
                        Сохранить
                </Button>
            </Box>
        </Popover>
    )
}


function MangaResultDesktop({
    manga,
    sx,
    onOpen,
    onClose
}: {
    manga: MangaShort, 
    sx?: SxProps,
    onOpen?: (manga: MangaShort, anchor?: HTMLElement | null) => void,
    onClose?: () => void
}) {
    const deviceType = useAppSelector(selectDeviceType)

    const openTimoutRef = useRef<NodeJS.Timeout | null>(null);
    const mangaItemRef = useRef<HTMLElement | null>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const [mangaMenuOpen, setMangaMenuOpen] = useState(false)

    const setShowDetailsTimeout = () => {
        if (closeTimeoutRef.current)
            clearTimeout(closeTimeoutRef.current)

        openTimoutRef.current = setTimeout(() => {
            openTimoutRef.current = null
            setMangaMenuOpen(true)
            onOpen?.(manga, mangaItemRef.current)
        }, 300)
    }

    const cleanShowDetailsTimeout = () => {
        closeTimeoutRef.current = setTimeout(() => {
            if (openTimoutRef.current)
                clearTimeout(openTimoutRef.current)

            setMangaMenuOpen(false)
            onClose?.()
        }, 100)
    }

    const throttledCleanShowDetails = throttle(() => {
        if (!open)
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
                onMouseEnter={() => {
                    if (deviceType === "desktop")
                        setShowDetailsTimeout()
                }}
                onMouseLeave={() => {
                    if (deviceType === "desktop")
                        cleanShowDetailsTimeout()
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
        </>
    )
}

function MangaResultMobile({
    manga,
    sx,
    open,
    onOpen,
    onClose
}: {
    manga: MangaShort, 
    sx?: SxProps,
    open: boolean,
    onOpen?: (manga: MangaShort, anchor?: HTMLElement | null) => void,
    onClose?: () => void
}) {
    const deviceType = useAppSelector(selectDeviceType)

    const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const mangaItemRef = useRef<HTMLElement | null>(null);
    const startYRef = useRef(0)
    const startXRef = useRef(0)
    const isLongPressTriggeredRef = useRef(false);

    const openMenu = (e: PointerEvent) => {
        if (e.pointerType === "mouse" || !e.isPrimary) return;

        isLongPressTriggeredRef.current = false;
        startXRef.current = e.clientX;
        startYRef.current = e.clientY;

        openTimeoutRef.current = setTimeout(() => {
            openTimeoutRef.current = null;
            isLongPressTriggeredRef.current = true;
            onOpen?.(manga, mangaItemRef.current);

            if (typeof navigator !== "undefined" && navigator.vibrate) {
                navigator.vibrate(40);
            }
        }, 400); // 400-500 мс комфортнее 300 мс: меньше ложных срабатываний при медленном скролле
    }

    const cancelTouch = () => {
        if (openTimeoutRef.current) {
            clearTimeout(openTimeoutRef.current);
            openTimeoutRef.current = null;
        }
    }

    useEffect(() => {
        return () => cancelTouch()
    }, []);

    return (
        <>
            <MangaItemSquare
                manga={manga as Manga}
                ref={mangaItemRef}
                onContextMenu={(event) => {
                    event.preventDefault();
                    cancelTouch();                      // чтобы таймер не выстрелил повторно
                    isLongPressTriggeredRef.current = true; // чтобы click после этого не навигировал
                    if (!open) {                        // опционально: не открывать повторно
                        onOpen?.(manga, mangaItemRef.current);
                    }
                }}
                // onClickCapture={(e: MouseEvent) => {
                //     if (isLongPressTriggeredRef.current) {
                //         e.preventDefault();
                //         e.stopPropagation();
                //         isLongPressTriggeredRef.current = false;
                //     }
                // }}
                onPointerUp={cancelTouch}
                onPointerDown={openMenu}
                onPointerMove={(e) => {
                    if (!openTimeoutRef.current || !e.isPrimary) return;

                    if (Math.abs(e.clientX - startXRef.current) > 10 || Math.abs(e.clientY - startYRef.current) > 10) {
                        cancelTouch();
                    }
                }}
                onPointerCancel={cancelTouch}
                sx={{
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",    /* Firefox */
                    MsUserSelect: "none",    /* Internet Explorer / Edge */
                    userSelect: "none",

                    WebkitTouchCallout: "none",
                    WebkitTapHighlightColor: "transparent",

                    // Запрещаем iOS Safari перехватывать долгое нажатие на постер и ссылки внутри карточки
                    "& img": {
                        WebkitTouchCallout: "none",
                        pointerEvents: "none",
                    },
                    
                    ...sx
                    }}  
            />
        </>
    )
}


export default function MangaResults({
    sx
}: {sx?: SxProps}) {
    const { results } = useSearch();
    const deviceType = useAppSelector(selectDeviceType)

    const [mangaMenuOpen, setMangaMenuOpen] = useState(false);
    const [focusedManga, setFocusedManga] = useState<MangaShort | null>(null)
    const [focusedMangaAnchor, setFocusedMangaAnchor] = useState<HTMLElement | null>(null)

    const handleOpen = (manga: MangaShort, anchor: HTMLElement | null = null) => {
        setFocusedManga(manga)
        setFocusedMangaAnchor(anchor)
        setMangaMenuOpen(true)
    }

    const handleClose = () => {
        setMangaMenuOpen(false)
    }

    return (
        <>
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
                        {deviceType == "desktop" ?
                            <MangaResultDesktop 
                                manga={manga as MangaShort}
                                onOpen={handleOpen}
                                onClose={handleClose}
                            />
                            :
                            <MangaResultMobile 
                                manga={manga as MangaShort}
                                open={mangaMenuOpen}
                                onOpen={handleOpen}
                                onClose={handleClose}
                            />
                        }
                    </Grid>
                ))}
            </Grid>
            { deviceType != "desktop" && focusedManga && (
                <MangaDetailsMobile 
                    shortData={focusedManga}
                    open={mangaMenuOpen}
                    onClose={handleClose}
                />
            )}
        </>
    )
}
import MangaItem, { MangaItemSquare } from "@/components/MangaItem";
import useSearch from "@/features/search/hooks/useSearch";
import { useAppSelector } from "@/lib/state/hooks";
import Manga from "@/types/manga/manga";
import { Box, BoxProps, Breadcrumbs, Button, Drawer, IconButton, Popover, Typography } from "@mui/material";
import Grid, { GridProps } from "@mui/material/Grid"
import { useEffect, useRef, useState } from "react";
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded"
import Description from "@/features/manga/components/Description";
import Genres from "@/features/manga/components/Genres";
import NameTranslations from "@/features/manga/components/NameTranslations";
import theme from "@/theme";
import Poster from "@/components/Poster";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import Stats from "@/features/manga/components/Stats";
import { ROUTES } from "@/routes";
import { useRouter } from "next/navigation";
import CollectionDialog from "@/features/collection/CollectionDialog";
import { throttle } from "lodash";



function MangaResult({
    manga,
    ...props
}: {manga: Manga} & BoxProps) {
    const deviceType = useAppSelector(state => state.app.deviceType)

    const router = useRouter()

    const openTimoutRef = useRef<NodeJS.Timeout | null>(null);
    const mangaItemRef = useRef<HTMLDivElement | null>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const [mangaMenuOpen, setMangaMenuOpen] = useState(false);
    const [collectionDialogOpen, setCollectionDialogOpen] = useState(false)

    const setShowDetailsTimeout = () => {
        if (closeTimeoutRef.current)
            clearTimeout(closeTimeoutRef.current)

        openTimoutRef.current = setTimeout(() => {
            setMangaMenuOpen(true)
            openTimoutRef.current = null
        }, 500)
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
    }, [])

    return (
        <>
            <MangaItem
                aria-owns={mangaMenuOpen ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                form={"square"} 
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
                    }
                }}  
            />
            { deviceType == "desktop" ?
                <Popover
                    onPointerOver={(event) => event.stopPropagation()}
                    onPointerEnter={(event) => event.stopPropagation()}
                    open={mangaMenuOpen}
                    onClose={() => {
                        setMangaMenuOpen(false)
                    }}
                    anchorEl={mangaItemRef.current}
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
                        onMouseEnter={() => {
                            if (closeTimeoutRef.current) {
                                clearTimeout(closeTimeoutRef.current)
                            }
                        }}
                        onMouseLeave={() => {
                            cleanShowDetailsTimeout()
                        }}

                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 2
                        }}
                    >   
                        <Box>
                            <Breadcrumbs>
                                <Typography>
                                    {manga.type.name}
                                </Typography>
                                <Typography>
                                    {manga.year}
                                </Typography>
                                <Typography>
                                    {manga.status.name}
                                </Typography>
                            </Breadcrumbs>
                            <Typography 
                                variant="h2"
                            >
                                {manga.name}
                            </Typography>
                            <Stats views={manga.views} saves={manga.saves} size="medium"/>
                        </Box>
                        <Description 
                            description={manga.description}
                        />
                        <Genres 
                            genres={manga.genres}
                        />
                        <NameTranslations 
                            nameTranslations={manga.name_translations}
                        />
                        <Button 
                            size="small" 
                            variant="contained"
                            startIcon={<BookmarkBorderRoundedIcon />}  
                            onClick={() => setCollectionDialogOpen(true)}  
                            sx={{
                                width: "200px"
                            }}
                        >
                                Сохранить
                        </Button>
                    </Box>
                </Popover>
                :
                <Drawer
                    open={mangaMenuOpen}
                    onClose={() => setMangaMenuOpen(false)}
                    anchor="bottom"
                    sx={{
                        "&>.MuiPaper-root": {
                            borderRadius: `${theme.spacing(3)} ${theme.spacing(3)} 0 0`,

                            background: `
                                linear-gradient(
                                    rgba(${theme.vars?.palette.background.defaultChannel} / 0.8) 0%, 
                                    rgba(${theme.vars?.palette.background.defaultChannel} / 0.9) 30%,
                                    rgba(${theme.vars?.palette.background.defaultChannel} / 1)) 100%, 
                                    url('${manga.background ? manga.background : manga.poster.medium}'
                                )
                            `,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundPositionY: "0",
                        }
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "end"
                            }}
                        >
                            <IconButton onClick={() => setMangaMenuOpen(false)}>
                                <CloseRoundedIcon />
                            </IconButton>
                        </Box>
                        <Box
                            sx={{
                                px: 2,
                                pt: 1,
                                pb: 3
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >
                                <Poster 
                                    src={manga.poster.small}
                                    width="80px"
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column"
                                }}
                            >
                                <Typography 
                                    variant="h2" 
                                    textAlign="center"
                                    mt={2}
                                >
                                    {manga.name}
                                </Typography>
                                <Stats views={manga.views} saves={manga.saves} size="small"/>
                            </Box>
                            <Box
                                sx={{
                                    mt: 2,
                                    display: "flex",
                                    flexDirection: "column",  
                                    rowGap: 2
                                }}
                            >
                                <Description description={manga.description}/>
                                <Genres genres={manga.genres}/>
                                <NameTranslations nameTranslations={manga.name_translations}/>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        columnGap: 1
                                    }}
                                >
                                    <Button
                                        startIcon={<BookmarkBorderRoundedIcon />}
                                        variant="contained"
                                        fullWidth
                                        onClick={() => setCollectionDialogOpen(true)}
                                    >
                                        Сохранить
                                    </Button>
                                    <Button
                                        startIcon={<OpenInNewRoundedIcon />}
                                        variant="contained"
                                        fullWidth
                                        onClick={() => router.push(ROUTES.MANGA.MAIN(manga.slug))}
                                    >
                                        Перейти
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Drawer>
            }
            <CollectionDialog 
                open={collectionDialogOpen}
                onClose={() => setCollectionDialogOpen(false)}
                manga={manga}
            />
        </>
    )
}

export default function MangaResults({
    ...props
}: GridProps) {
    const { results } = useSearch();

    return (
        <Grid
            container
            columns={{
                xs: 3,
                sm: 4,
                md: 5,
            }}
            spacing={{
                xs: 1.2,
                sm: 2,
                md: 3
            }}
            {...props}
        >
            {results.map(manga => (
                <Grid 
                    size={1}
                    key={`catalog_manga_${manga.slug}`}
                >
                    <MangaResult 
                        manga={manga as Manga}
                    />
                </Grid>
            ))}
        </Grid>
    )
}
"use client"

import MangaGrid from "@/components/manga/MangaGrid"
import { MangaItemSquare } from "@/components/manga/MangaItem"
import { selectCollection, selectCollectionManga } from "@/features/collection/states/collection-page/slice"
import { selectAuthProfile } from "@/features/global/states/auth-profile"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { Box, IconButton, Typography } from "@mui/material"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import { removeMangaFromCollection } from "@/features/collection/states/lib/thunks"

export default function MangaList() {
    const dispatch = useAppDispatch()

    const collection = useAppSelector(selectCollection)
    const manga = useAppSelector(selectCollectionManga)
    
    const authProfile = useAppSelector(selectAuthProfile)

    if (!collection)
        return
    
    if (manga.length == 0)
        return (
            <Typography 
                color="textSecondary" 
                textAlign={"center"}
                py={4}
            >
                Коллекция пуста.
            </Typography>
        )

    return (
        <MangaGrid sx={{mt: 2}}>
            {manga.map(m => (
                <MangaItemSquare
                    key={`collections_page_manga_${m.slug}`}
                    manga={m}
                    rightTopAdornment={
                        <>
                            {authProfile?.id == collection?.creator.id && (
                                <Box
                                    onClick={(event) => {
                                        event.preventDefault()

                                        dispatch(removeMangaFromCollection({mangaSlug: m.slug, collectionId: collection.id}))
                                    }}
                                    sx={{
                                        bgcolor: "background.paper",

                                        display: "flex",
                                        p: 0.4,
                                        borderRadius: "50%",
                                        "&:hover": {
                                            cursor: "pointer"
                                        }
                                    }}
                                >
                                    <CloseRoundedIcon 
                                        sx={{
                                            width: "20px",
                                            height: "20px"
                                        }}
                                    />
                                </Box>
                            )}
                        </>
                    }
                />
            ))} 
        </MangaGrid>
    )
}
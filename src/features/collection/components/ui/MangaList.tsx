"use client"

import MangaGrid from "@/features/manga/components/MangaGrid"
import { MangaItemSquare } from "@/features/manga/components/MangaItem"
import { selectCollection, selectCollectionManga } from "@/features/collection/states/collection-page/slice"
import { selectAuthProfile } from "@/features/auth/states/auth-profile"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { Box, IconButton, Typography } from "@mui/material"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import { removeMangaFromCollection } from "@/features/collection/states/lib/thunks"
import { MangaShort } from "@/features/manga/types"

export default function MangaList({manga}: {
    manga: MangaShort[]
}) {
    const dispatch = useAppDispatch()

    const collection = useAppSelector(selectCollection)
    
    const authProfile = useAppSelector(selectAuthProfile)

    if (!collection)
        return
    
    if (manga.length == 0)
        return (
            <Typography 
                color="textSecondary" 
                sx={{
                    textAlign: "center",
                    py: 4
                }}
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
                            {authProfile?.id == collection?.data.creator.id && (
                                <Box
                                    onClick={(event) => {
                                        event.preventDefault()

                                        dispatch(removeMangaFromCollection({mangaId: m.id, collectionId: collection.data.id}))
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